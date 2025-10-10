import { Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { CodCatalogo } from "components/helpers/Enums";
import InputRadioGroup from "components/input/InputRadioGroup";
import InputSelect from "components/input/InputSelect";
import InputText from "components/input/InputText";
import { useEffect, useState } from "react";
import SubCard from "ui-component/cards/SubCard";

const ValoresDefecto = {
    Presente: 11101,
    Positivo: 4097
}

const ForensicClinicalExamination = ({ modelData, methods }) => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));
    const valuesNistagmusEspontaneo = methods.watch("exaCliForeEvalNistagmusEspontaneo");
    const valuesNistagmusMirada = methods.watch("exaCliForeEvalPruebaNistagmusMirada");
    const valuesNistagmusPostRocional = methods.watch("exaCliForeEvalPruebaNistagmusPostRocional");

    const [lsAliento, setLsAliento] = useState([]);
    const [lsEstadoConciencia, setLsEstadoConciencia] = useState([]);
    const [lsResultAtencion, setLsResultAtencion] = useState([]);
    const [lsFlujoLen, setLsFlujoLen] = useState([]);
    const [lsDisatria, setLsDisatria] = useState([]);
    const [lsPupila, setLsPupila] = useState([]);
    const [lsOtrasOpciones, setLsOtrasOpciones] = useState([]);
    const [lsOpcionesAusenPrese, setLsOpcionesAusenPrese] = useState([]);
    const [lsReflejoOsteo, setLsReflejoOsteo] = useState([]);
    const [lsOpcion, setLsOpcion] = useState([]);
    const [lsResultEvaluacion, setLsResultEvaluacion] = useState([]);
    const [lsResultPosNeg, setLsResultPosNeg] = useState([]);

    useEffect(() => {
        async function getCombo() {
            const lsServerAliento = await GetByTipoCatalogoCombo(CodCatalogo.ALIENTOALCOHOLICO);
            setLsAliento(lsServerAliento.data);

            const lsServerResultPosNeg = await GetByTipoCatalogoCombo(CodCatalogo.PAD_RESULTADO);
            setLsResultPosNeg(lsServerResultPosNeg.data.sort((a, b) => b.value - a.value));

            const lsServerEstadoConciencia = await GetByTipoCatalogoCombo(CodCatalogo.ESTADOCONCIENCIA);
            setLsEstadoConciencia(lsServerEstadoConciencia.data);

            const lsServerResultAtencion = await GetByTipoCatalogoCombo(CodCatalogo.ATENCION);
            setLsResultAtencion(lsServerResultAtencion.data);

            const lsServerFlujoLen = await GetByTipoCatalogoCombo(CodCatalogo.FLUJOLENGUAJE);
            setLsFlujoLen(lsServerFlujoLen.data);

            const lsServerDisatria = await GetByTipoCatalogoCombo(CodCatalogo.DISARTRIA);
            setLsDisatria(lsServerDisatria.data);

            const lsServerPupila = await GetByTipoCatalogoCombo(CodCatalogo.PUPILA);
            setLsPupila(lsServerPupila.data);

            const lsServerOtrasOpciones = await GetByTipoCatalogoCombo(CodCatalogo.OTRASOPCIONES);
            setLsOtrasOpciones(lsServerOtrasOpciones.data.sort((a, b) => a.value - b.value));

            const lsServerReflejoOsteo = await GetByTipoCatalogoCombo(CodCatalogo.REFLEJOSOSTEOTENDINOSOS);
            setLsReflejoOsteo(lsServerReflejoOsteo.data);

            const lsServerOpcionesAusenPrese = await GetByTipoCatalogoCombo(CodCatalogo.OPCIONESAUSENTEPRESENTE);
            setLsOpcionesAusenPrese(lsServerOpcionesAusenPrese.data);

            const lsServerResultEvaluacion = await GetByTipoCatalogoCombo(CodCatalogo.CUANDOPOSITIVO);
            setLsResultEvaluacion(lsServerResultEvaluacion.data);

            const lsServerOpcion = await GetByTipoCatalogoCombo(CodCatalogo.Opciones_SINO);
            setLsOpcion(lsServerOpcion.data);
        }

        getCombo();
    }, []);

    return (
        <SubCard darkTitle title="Examen clínico forense">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <InputText
                        defaultValue={modelData?.exaCliForeConductaMotriz}
                        fullWidth
                        rows={2}
                        multiline
                        name="exaCliForeConductaMotriz"
                        label="Presentación, porte, actitud, conducta motriz"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard title="Olores asociados">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputRadioGroup
                                    defaultValue={modelData?.exaCliForeOlorAlientoAlcoholico}
                                    name="exaCliForeOlorAlientoAlcoholico"
                                    label="Aliento alcohólico:"
                                    options={lsAliento}
                                    row={true}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputText
                                    defaultValue={modelData?.exaCliForeOlorOtros}
                                    fullWidth
                                    rows={2}
                                    multiline
                                    name="exaCliForeOlorOtros"
                                    label="Otros (describalos)"
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard title="Sensorio">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputRadioGroup
                                    defaultValue={modelData?.exaCliForeSensoEstadoConciencia}
                                    name="exaCliForeSensoEstadoConciencia"
                                    label="Estado de conciencia:"
                                    options={lsEstadoConciencia}
                                    row={true}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputText
                                    defaultValue={modelData?.exaCliForeSensoOrientacion}
                                    fullWidth
                                    name="exaCliForeSensoOrientacion"
                                    label="Orientación"
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputRadioGroup
                                    defaultValue={modelData?.exaCliForeSensoAtencion}
                                    name="exaCliForeSensoAtencion"
                                    label="Atención:"
                                    options={lsResultAtencion}
                                    row={true}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputText
                                    defaultValue={modelData?.exaCliForeSensoMemoria}
                                    fullWidth
                                    name="exaCliForeSensoMemoria"
                                    label="Memoria"
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}><Divider /></Grid>

                <Grid item xs={12}>
                    <Typography variant="caption" align="justify" fontSize={12}>Nota: (Tipo de afecto, modulación, congruencia, adecuado o inadecuado en relación con las circunstancias).</Typography>
                </Grid>

                <Grid item xs={12}>
                    <InputText
                        defaultValue={modelData?.exaCliForeAfecto}
                        fullWidth
                        rows={2}
                        multiline
                        name="exaCliForeAfecto"
                        label="Afecto"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12}><Divider /></Grid>

                <Grid item xs={12}>
                    <SubCard title="Lenguaje">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputRadioGroup
                                    defaultValue={modelData?.exaCliForeLengFlujoLenguaje}
                                    name="exaCliForeLengFlujoLenguaje"
                                    label="Flujo del lenguaje:"
                                    options={lsFlujoLen}
                                    row={true}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputRadioGroup
                                    defaultValue={modelData?.exaCliForeLengDisartria}
                                    name="exaCliForeLengDisartria"
                                    label="Disartria:"
                                    options={lsDisatria}
                                    row={true}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputText
                                    defaultValue={modelData?.exaCliForeLengOtrasAlteraciones}
                                    fullWidth
                                    rows={2}
                                    multiline
                                    name="exaCliForeLengOtrasAlteraciones"
                                    label="Otras alteraciones (describalas)"
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <InputText
                        defaultValue={modelData?.exaCliForeAlteracionesPensamiento}
                        fullWidth
                        rows={2}
                        multiline
                        name="exaCliForeAlteracionesPensamiento"
                        label="Alteraciones del pensamiento, sensopercepción, inteligencia, juicio, racioncinio e introspección (describalas):"
                        size={matchesXS ? 'small' : 'medium'}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SubCard title="Signos vitales y otros">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={3}>
                                <InputText
                                    defaultValue={modelData?.exaCliForeSignoFrecuenciaCardiaca}
                                    fullWidth
                                    name="exaCliForeSignoFrecuenciaCardiaca"
                                    label="Frecuencia cardíaca (En lpm)"
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <InputText
                                    defaultValue={modelData?.exaCliForeSignoFrecuenciaRespiratoria}
                                    fullWidth
                                    name="exaCliForeSignoFrecuenciaRespiratoria"
                                    label="Frecuencia respiratoria"
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <InputText
                                    defaultValue={modelData?.exaCliForeSignoPresionArterial}
                                    fullWidth
                                    name="exaCliForeSignoPresionArterial"
                                    label="Presión arterial"
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <InputText
                                    defaultValue={modelData?.exaCliForeSignoTemperatura}
                                    fullWidth
                                    name="exaCliForeSignoTemperatura"
                                    label="Temperatura (En °C)"
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12}><Divider /></Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <InputText
                                    defaultValue={modelData?.exaCliForeSignoTalla}
                                    fullWidth
                                    name="exaCliForeSignoTalla"
                                    label="Talla"
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={3}>
                                <InputText
                                    defaultValue={modelData?.exaCliForeSignoPeso}
                                    fullWidth
                                    name="exaCliForeSignoPeso"
                                    label="Peso"
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputText
                                    defaultValue={modelData?.exaCliForeSignoPielMucosas}
                                    fullWidth
                                    name="exaCliForeSignoPielMucosas"
                                    label="Piel y mucosas"
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard title="Ojos">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={4}>
                                <InputSelect
                                    defaultValue={modelData?.exaCliForeOjoCongestionConjuntival}
                                    name="exaCliForeOjoCongestionConjuntival"
                                    label="Congestión conjuntival"
                                    options={lsOpcion}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputSelect
                                    defaultValue={modelData?.exaCliForeOjoPupilas}
                                    name="exaCliForeOjoPupilas"
                                    label="Pupilas"
                                    options={lsPupila}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputSelect
                                    defaultValue={modelData?.exaCliForeOjoReflejoFomotomor}
                                    name="exaCliForeOjoReflejoFomotomor"
                                    label="Reflejo fomotomor"
                                    options={lsOtrasOpciones}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputSelect
                                    defaultValue={modelData?.exaCliForeOjoReflejoConsensual}
                                    name="exaCliForeOjoReflejoConsensual"
                                    label="Reflejo consensual"
                                    options={lsOtrasOpciones}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputSelect
                                    defaultValue={modelData?.exaCliForeOjoConvergenciaOcular}
                                    name="exaCliForeOjoConvergenciaOcular"
                                    label="Convergencia ocular"
                                    options={lsOtrasOpciones}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} lg={4}>
                                <InputSelect
                                    defaultValue={modelData?.exaCliForeOjoReflejoOsteotendinosos}
                                    name="exaCliForeOjoReflejoOsteotendinosos"
                                    label="Reflejos osteotendinosos"
                                    options={lsReflejoOsteo}
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard title="Coordinación motora, equilibrio y marcha">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputRadioGroup
                                    defaultValue={modelData?.exaCliForeCoordinaPruebasMoviento}
                                    name="exaCliForeCoordinaPruebasMoviento"
                                    label="Pruebas de movimiento punto a punto (dedo-nariz, dedo-dedo):"
                                    options={lsOtrasOpciones}
                                    row={true}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputRadioGroup
                                    defaultValue={modelData?.exaCliForeCoordinaTestMovimiento}
                                    name="exaCliForeCoordinaTestMovimiento"
                                    label="Test de movimientos rápidos alternos:"
                                    options={lsOtrasOpciones}
                                    row={true}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputRadioGroup
                                    defaultValue={modelData?.exaCliForeCoordinaPruebaRomberg}
                                    name="exaCliForeCoordinaPruebaRomberg"
                                    label="Prueba de Romberg:"
                                    options={lsOtrasOpciones}
                                    row={true}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputRadioGroup
                                    defaultValue={modelData?.exaCliForeCoordinaPruebaMarca}
                                    name="exaCliForeCoordinaPruebaMarca"
                                    label="Prueba de marcha en tandem (punta-talón):"
                                    options={lsOtrasOpciones}
                                    row={true}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputRadioGroup
                                    defaultValue={modelData?.exaCliForeCoordinaPruebaMarcha}
                                    name="exaCliForeCoordinaPruebaMarcha"
                                    label="Prueba de marcha en las puntas de los pies y en los talones:"
                                    options={lsOtrasOpciones}
                                    row={true}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputText
                                    defaultValue={modelData?.exaCliForeCoordinaObservaciones}
                                    fullWidth
                                    rows={2}
                                    multiline
                                    name="exaCliForeCoordinaObservaciones"
                                    label="Observaciones"
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                <Grid item xs={12}>
                    <SubCard title="Evaluación de nistagmus">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={8}>
                                <InputRadioGroup
                                    defaultValue={modelData?.exaCliForeEvalNistagmusEspontaneo}
                                    name="exaCliForeEvalNistagmusEspontaneo"
                                    label="Nistagmus espontáneo:"
                                    options={lsOpcionesAusenPrese}
                                    row={true}
                                />
                            </Grid>

                            {valuesNistagmusEspontaneo == ValoresDefecto.Presente &&
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        defaultValue={modelData?.exaCliForeEvalResultadoNistagmusEspontaneo}
                                        name="exaCliForeEvalResultadoNistagmusEspontaneo"
                                        label="Resultado"
                                        options={lsResultEvaluacion}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>
                            }

                            <Grid item xs={12} md={6} lg={8}>
                                <InputRadioGroup
                                    defaultValue={modelData?.exaCliForeEvalPruebaNistagmusMirada}
                                    name="exaCliForeEvalPruebaNistagmusMirada"
                                    label="Prueba de nistagmus a mirada extrema:"
                                    options={lsResultPosNeg}
                                    row={true}
                                />
                            </Grid>

                            {valuesNistagmusMirada == ValoresDefecto.Positivo &&
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        defaultValue={modelData?.exaCliForeEvalResultadoPruebaNistagmusMirada}
                                        name="exaCliForeEvalResultadoPruebaNistagmusMirada"
                                        label="Resultado"
                                        options={lsResultEvaluacion}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>
                            }

                            <Grid item xs={12} md={6} lg={8}>
                                <InputRadioGroup
                                    defaultValue={modelData?.exaCliForeEvalPruebaNistagmusPostRocional}
                                    name="exaCliForeEvalPruebaNistagmusPostRocional"
                                    label="Prueba de nistagmus post-rotacional:"
                                    options={lsResultPosNeg}
                                    row={true}
                                />
                            </Grid>

                            {valuesNistagmusPostRocional == ValoresDefecto.Positivo &&
                                <Grid item xs={12} md={6} lg={4}>
                                    <InputSelect
                                        defaultValue={modelData?.exaCliForeEvalResultadoPruebaNistagmusPostRocional}
                                        name="exaCliForeEvalResultadoPruebaNistagmusPostRocional"
                                        label="Resultado"
                                        options={lsResultEvaluacion}
                                        size={matchesXS ? 'small' : 'medium'}
                                    />
                                </Grid>
                            }

                            <Grid item xs={12}>
                                <InputText
                                    defaultValue={modelData?.exaCliForeEvalObservaciones}
                                    fullWidth
                                    rows={2}
                                    multiline
                                    name="exaCliForeEvalObservaciones"
                                    label="Observaciones"
                                    size={matchesXS ? 'small' : 'medium'}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputRadioGroup
                                    defaultValue={modelData?.exaCliForeEvalPruebaRomberg}
                                    name="exaCliForeEvalPruebaRomberg"
                                    label="Prueba de Romberg:"
                                    options={lsOtrasOpciones}
                                    row={true}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default ForensicClinicalExamination;