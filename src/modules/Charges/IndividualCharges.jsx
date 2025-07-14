import {
    Button,
    Grid,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetAllClasePanorama, GetGesClaseRiesgo, InsertPanoramaIndividual } from 'api/clients/PanoramaClient';
import { CodCatalogo, TitleButton, ValidationMessage } from 'components/helpers/Enums';
import InputSelect from 'components/input/InputSelect';
import InputSelectAutocomplete from 'components/input/InputSelectAutocomplete';
import InputText from 'components/input/InputText';
import { useBoolean } from 'hooks/use-boolean';
import LoadingMassive from 'modules/OrderScheduling/components/LoadingMassive';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import LoadingClass from './components/LoadingClass';

const IdRiesgoPsicosocial = 14898;

const IndividualCharges = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesXS = useMediaQuery(theme.breakpoints.down('md'));

    const loadingInfo = useBoolean(true);
    const [lsGes, setLsGes] = useState([]);
    const [lsClase, setLsClase] = useState([]);
    const [lsRiesgo, setLsRiesgo] = useState([]);
    const [lsExposicion, setLsExposicion] = useState([]);
    const [lsRosterPosition, setLsRosterPosition] = useState([]);
    const [lsGradoConSinEPP, setLsGradoConSinEPP] = useState([]);
    const [lsTiempo, setLTiempo] = useState([]);

    const methods = useForm();
    const { handleSubmit, formState: { errors }, watch, reset, setError, setValue, resetField, clearErrors } = methods;
    const values = watch();

    const [clasesValues, setClasesValues] = useState({});

    useEffect(() => {
        async function getCombo() {
            try {
                const lsServerRiesgo = await GetByTipoCatalogoCombo(CodCatalogo.GRUPO_RIESGO);
                const sortedData = lsServerRiesgo.data.sort((a, b) => a.value - b.value);
                setLsRiesgo(sortedData);

                const lsServerGes = await GetByTipoCatalogoCombo(CodCatalogo.Ges);
                setLsGes(lsServerGes.data);

                const lsServerTiempo = await GetByTipoCatalogoCombo(CodCatalogo.HCO_RIESGO_CLASIFICACION);
                setLTiempo(lsServerTiempo.data);

                const lsServerRoster = await GetByTipoCatalogoCombo(CodCatalogo.RosterPosition);
                setLsRosterPosition(lsServerRoster.data);

                const lsServerExposicion = await GetByTipoCatalogoCombo(CodCatalogo.PANO_EXPOSICIÓN);
                setLsExposicion(lsServerExposicion.data);

                const lsServerGradoConSinEPP = await GetByTipoCatalogoCombo(CodCatalogo.PANO_GRADO_CONSINEPP);
                setLsGradoConSinEPP(lsServerGradoConSinEPP.data);
            } catch (error) { }
        }

        getCombo();
    }, []);

    useEffect(() => {
        if (!values.idRosterPosition) {
            resetField("idRiesgo");
            resetField("idGes");
            resetField("claseRiesgo");
            setLsClase([]);
        }
    }, [values.idRosterPosition]);

    async function handleClickRoster(event, newValue) {
        try {
            setLsClase([]);
            setClasesValues({});
            resetField("idRiesgo");

            setValue("idRosterPosition", newValue, { shouldValidate: true });
            const result = await GetGesClaseRiesgo(newValue.value);
            setValue("idGes", result?.data);
            setValue("claseRiesgo", result?.data.intcodigo);

            if (result.status == 200) {
                clearErrors("idGes");
                clearErrors("claseRiesgo");
            }
        } catch (error) {

        }
    }

    async function handleClickRiesgo(event) {
        try {
            loadingInfo.onTrue();
            setLsClase([]);
            setClasesValues({});

            const { value } = event.target;
            setValue("idRiesgo", value, { shouldValidate: true });

            if (values.idRosterPosition.value && value) {
                const lsServerClase = await GetAllClasePanorama(values.idRosterPosition.value, value);
                if (lsServerClase.status === 200) {
                    setTimeout(() => {
                        loadingInfo.onFalse();
                        setLsClase(lsServerClase.data);
                    }, 800);
                }
            }
        } catch (error) {
            loadingInfo.onFalse();
        }
    }

    function validateClaseRiesgo() {
        const validationFields = {
            idGes: 'idGes',
            idRiesgo: 'idRiesgo',
            idRosterPosition: 'idRosterPosition',
            claseRiesgo: 'claseRiesgo'
        };

        let hasErrors = false;

        Object.entries(validationFields)?.forEach(([field, fieldName]) => {
            if (!values[field]) {
                setError(fieldName, { type: 'manual', message: ValidationMessage.Requerido });
                hasErrors = true;
            }
        });

        if (hasErrors)
            return true;

        return false;
    }

    function onClickClear() {
        setClasesValues({});
        setLsClase([]);
        reset();
    }

    const handleClick = async (datos) => {
        try {
            var validacion = validateClaseRiesgo();
            if (validacion) return;

            const resultado = Object.entries(clasesValues).map(([classId, classValues]) => ({
                idGes: datos.idGes,
                idCargo: datos.idRosterPosition,
                claseRiesgo: datos.claseRiesgo,
                riesgo: datos.idRiesgo,
                clase: parseInt(classId),
                ...classValues,
            }));

            const result = await InsertPanoramaIndividual(resultado);
            if (result.data.response) {
                toast.success(result.data.mensaje);
            } else {
                toast.error(result.data.mensaje);
            }
        } catch (error) {

        }
    };

    const generateName = useMemo(() => {
        if (!values.idRiesgo) return '';
        const riesgoLabel = lsRiesgo.find(item => item.value === values.idRiesgo)?.label || '';
        if (values.idRiesgo === IdRiesgoPsicosocial)
            return `Condición del riesgo ${riesgoLabel}`.toUpperCase();
        else
            return `Clases del riesgo ${riesgoLabel}`.toUpperCase();
    }, [values.idRiesgo, lsRiesgo]);

    useEffect(() => {
        if (lsClase.length > 0) {
            const initialClasesValues = lsClase.reduce((acc, item) => {
                acc[item.idClase] = {
                    id: item.idPanorama || null,
                    claseAplicaParaCargo: item.claseAplicaParaCargo || null,
                    exposicion: item.exposicion || null,
                    gradoconEPP: item.gradoconEPP || null,
                    gradosinEPP: item.gradosinEPP || null,
                    medidasControl: item.medidasControl || null,
                    tiempoExposicion: item.tiempoExposicion || null,
                    intensidad: item.intensidad || null,
                    frecuenciaPresentacion: item.frecuenciaPresentacion || null,
                };
                return acc;
            }, {});
            setClasesValues(initialClasesValues);
        } else {
            setClasesValues({});
        }
    }, [lsClase]);

    const notFound = !lsClase.length;

    return (
        <FormProvider {...methods}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
                    <InputSelectAutocomplete
                        name="idRosterPosition"
                        label="Cargo"
                        options={lsRosterPosition}
                        defaultValue={null}
                        onChange={handleClickRoster}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <InputSelect
                        name="idRiesgo"
                        label="Riesgo"
                        defaultValue=""
                        options={lsRiesgo}
                        size={matchesXS ? 'small' : 'medium'}
                        bug={errors.idRiesgo}
                        onChange={handleClickRiesgo}
                        disabled={!values?.idRosterPosition}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={2}>
                    <InputSelectAutocomplete
                        name="idGes"
                        label="Ges"
                        options={lsGes}
                        defaultValue={null}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={2}>
                    <InputText
                        name="claseRiesgo"
                        label="Clase de riesgo"
                        defaultValue=""
                        size={matchesXS ? 'small' : 'medium'}
                        bug={errors.claseRiesgo}
                    />
                </Grid>

                {values.idRosterPosition && values.idRiesgo ? (
                    <Grid item xs={12} sx={{ mt: 1.5 }}>
                        <LoadingMassive loadingModulo={loadingInfo.value} notFound={notFound}>
                            <SubCard title={generateName}>
                                {lsClase.map((item) => {
                                    const controls = [
                                        {
                                            type: 'select',
                                            name: `clases.${item.idClase}.claseAplicaParaCargo`,
                                            label: '¿La clase aplica para el cargo?',
                                            options: [{ value: 1, label: 'SÍ' }, { value: 2, label: 'NO' }],
                                        },
                                        {
                                            type: 'select',
                                            name: `clases.${item.idClase}.exposicion`,
                                            label: 'Exposición',
                                            options: lsExposicion,
                                            see: false,
                                        },
                                        {
                                            type: 'select',
                                            name: `clases.${item.idClase}.frecuenciaPresentacion`,
                                            label: 'Frecuencia de presentación',
                                            options: lsTiempo,
                                            see: true,
                                        },
                                        {
                                            type: 'select',
                                            name: `clases.${item.idClase}.tiempoExposicion`,
                                            label: 'Tiempo de exposición',
                                            options: lsTiempo,
                                            see: true
                                        },
                                        {
                                            type: 'select',
                                            name: `clases.${item.idClase}.intensidad`,
                                            label: 'Intensidad',
                                            options: lsTiempo,
                                            see: true
                                        },
                                        {
                                            type: 'select',
                                            name: `clases.${item.idClase}.gradoconEPP`,
                                            label: 'Grado con EPP',
                                            options: lsGradoConSinEPP,
                                            see: false
                                        },
                                        {
                                            type: 'select',
                                            name: `clases.${item.idClase}.gradosinEPP`,
                                            label: 'Grado sin EPP',
                                            options: lsGradoConSinEPP,
                                            see: false
                                        },
                                        {
                                            type: 'text',
                                            name: `clases.${item.idClase}.medidasControl`,
                                            label: 'Medidas de control',
                                            sx: { mb: 2 },
                                            see: false
                                        },
                                    ];

                                    let filteredControls = controls;
                                    if (values.idRiesgo == IdRiesgoPsicosocial)
                                        filteredControls = controls.filter((ctrl, idx) => idx < 1 || ctrl.see === true);
                                    else
                                        filteredControls = controls.filter((ctrl, idx) => idx < 1 || ctrl.see === false);

                                    return (
                                        <Grid container spacing={3} key={item.idClase}>
                                            <Grid item xs={12}>
                                                <SubCard title={item.nombreClase} sx={{ mb: 2.5 }}>
                                                    <Grid container spacing={2.5}>
                                                        {filteredControls.map(({ type, name, label, options, sx }, index) => {
                                                            const fieldName = name.split('.').pop();
                                                            const isExposicionField = fieldName === 'exposicion';
                                                            const claseAplicaParaCargoValue = clasesValues[item.idClase]?.claseAplicaParaCargo;

                                                            return (
                                                                <Grid item xs={12} md={6} lg={fieldName === 'medidasControl' ? 8 : 4} key={index}>
                                                                    {type === 'select' ? (
                                                                        <InputSelect
                                                                            name={name}
                                                                            label={label}
                                                                            defaultValue={clasesValues[item.idClase]?.[fieldName] || ""}
                                                                            options={options}
                                                                            size={matchesXS ? 'small' : 'medium'}
                                                                            bug={errors[name]}
                                                                            value={clasesValues[item.idClase]?.[fieldName] || ""}
                                                                            onChange={(e) => {
                                                                                setClasesValues((prev) => {
                                                                                    const newValue = e.target.value;
                                                                                    if (fieldName === 'claseAplicaParaCargo' && newValue === 2) {
                                                                                        return {
                                                                                            ...prev,
                                                                                            [item.idClase]: {
                                                                                                ...prev[item.idClase],
                                                                                                [fieldName]: newValue,
                                                                                                exposicion: null,
                                                                                            },
                                                                                        };
                                                                                    }
                                                                                    return {
                                                                                        ...prev,
                                                                                        [item.idClase]: {
                                                                                            ...prev[item.idClase],
                                                                                            [fieldName]: newValue,
                                                                                        },
                                                                                    };
                                                                                });
                                                                            }}
                                                                            disabled={isExposicionField && claseAplicaParaCargoValue === 2}
                                                                        />
                                                                    ) : (
                                                                        <InputText
                                                                            name={name}
                                                                            label={label}
                                                                            defaultValue={clasesValues[item.idClase]?.[fieldName] || ""}
                                                                            size={matchesXS ? 'small' : 'medium'}
                                                                            bug={errors[name]}
                                                                            sx={sx}
                                                                            value={clasesValues[item.idClase]?.[fieldName] || ""}
                                                                            onChange={(e) => {
                                                                                setClasesValues((prev) => ({
                                                                                    ...prev,
                                                                                    [item.idClase]: {
                                                                                        ...prev[item.idClase],
                                                                                        [fieldName]: e.target.value,
                                                                                    },
                                                                                }));
                                                                            }}
                                                                        />
                                                                    )}
                                                                </Grid>
                                                            )
                                                        })}
                                                    </Grid>
                                                </SubCard>
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                            </SubCard>
                        </LoadingMassive>
                    </Grid>) : <LoadingClass />
                }

                <Grid item xs={12} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4} lg={2}>
                            <AnimateButton>
                                <Button variant="contained" onClick={handleSubmit(handleClick)} fullWidth>
                                    {TitleButton.Guardar}
                                </Button>
                            </AnimateButton>
                        </Grid>

                        <Grid item xs={6} md={4} lg={2}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={onClickClear}>
                                    {TitleButton.Limpiar}
                                </Button>
                            </AnimateButton>
                        </Grid>

                        <Grid item xs={6} md={4} lg={2}>
                            <AnimateButton>
                                <Button variant="outlined" fullWidth onClick={() => navigate("/panorama/list")}>
                                    {TitleButton.Cancelar}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default IndividualCharges;