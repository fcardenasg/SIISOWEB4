import { yupResolver } from '@hookform/resolvers/yup';

import {
    Button,
    Divider,
    Grid,
    Box,
    Card,
    CardContent,
    Stack,
    Alert,
    Typography
} from '@mui/material';

import {
    Assessment,
    BusinessCenter,
    Description,
    LocalHospital,
    Person,
    Save,
    SupervisorAccount,
    ArrowBack
} from '@mui/icons-material';

import {
    useEffect,
    useState
} from 'react';

import {
    FormProvider,
    useForm
} from 'react-hook-form';

import toast from 'react-hot-toast';

import {
    useNavigate
} from 'react-router-dom';

import * as yup from 'yup';

import { useTheme } from '@mui/material/styles';

import AnimateButton from 'ui-component/extended/AnimateButton';

import ValidateActionSkeleton from 'components/ValidateAction/ValidateActionSkeleton';

import {
    AccionMenu,
    Modulo,
    CodCatalogo,
    TitleButton
} from 'components/helpers/Enums';

import InputDatePicker from 'components/input/InputDatePicker';
import InputSelect from 'components/input/InputSelect';
import InputText from 'components/input/InputText';

import DiagnosisAPT from './Components/DiagnosisAPT';
import DetailFuentes from './Components/DetailFuentes';
import DetailAgentes from './Components/DetailAgentes';

import {
    InsertAPTCalificacion
} from 'api/clients/APTRatingClient';

import {
    GetByTipoCatalogoCombo
} from 'api/clients/CatalogClient';

import ViewEmployee from 'components/views/ViewEmployee';

import {
    GetByIdEmployee
} from 'api/clients/EmployeeClient';

import {
    ComboEmpresaAPT
} from 'api/clients/APTRatingClient';

const SectionCard = ({ icon: Icon, title, subtitle, children }) => (
    <Card
        sx={{
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.06)',
            backgroundColor: 'rgba(255,255,255,0.96)',
            paddingRight:4
        }}
    >
        <CardContent
            sx={{
                px: 3.5,
                py: 3
            }}
        >
            <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            display: 'grid',
                            placeItems: 'center',
                            bgcolor: 'rgba(25, 118, 210, 0.08)',
                            color: 'primary.main'
                        }}
                    >
                        <Icon fontSize="small" />
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700 }}>
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                </Stack>
                {children}
            </Stack>
        </CardContent>
    </Card>
);

const ResultCard = ({ icon: Icon, title, value }) => (
    <Card
        sx={{
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 'none',
            backgroundColor: 'transparent'
        }}
    >
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
                sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    display: 'grid',
                    placeItems: 'center',
                    bgcolor: 'rgba(25, 118, 210, 0.08)',
                    color: 'primary.main'
                }}
            >
                <Icon fontSize="small" />
            </Box>
            <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {title}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, opacity: 0.85 }}>
                    {value ?? '-'}
                </Typography>
            </Box>
        </CardContent>
    </Card>
);

const validationSchema = yup.object().shape({

    fecha: yup
        .date()
        .required('La fecha es requerida'),

    documento: yup
        .string()
        .required('El documento es requerido')

   
});

const APTQualification = () => {

    const navigate = useNavigate();
    const theme = useTheme();

    const [modelEmployee, setModelEmployee] =
    useState([]);

    // =========================
    // COMBOS
    // =========================

    const [company, setCompany] =
        useState([]);

    const [lsFuentes, setLsFuentes] =
        useState([]);

    const [lsParentesco, setLsParentesco] =
        useState([]);

    const [lsGrupoCondicion, setLsGrupoCondicion] =
        useState([]);

    const [lsCondicion, setLsCondicion] =
        useState([]);

    const [lsExposicion, setLsExposicion] =
        useState([]);

    const [lsFrecuencia, setLsFrecuencia] =
        useState([]);

    const [lsIntensidad, setLsIntensidad] =
        useState([]);

    const [lsTipo, setLsTipo] =
        useState([]);

    const [lsCargo, setLsCargo] =
        useState([]);

    const [lsArea, setLsArea] =
        useState([]);

    const [lsPuestoTrabajo, setLsPuestoTrabajo] =
        useState([]);

    // =========================
    // DETALLES
    // =========================

    const [detalleFuentes, setDetalleFuentes] =
        useState([]);

    const [detalleAgentes, setDetalleAgentes] =
        useState([]);

    // =========================
    // DX
    // =========================

    const [dx1, setDx1] =
        useState(null);

    const [dx2, setDx2] =
        useState(null);

    const [dx3, setDx3] =
        useState(null);

    // =========================
    // FORM
    // =========================

    const methods = useForm({

        resolver:
            yupResolver(validationSchema),

       defaultValues: {

    fecha: new Date(),

    documento: '',

    idEmpresa: '',

    idPuestoTrabajo: null,

    fechaIngresoEmpresa: null,

    fechaIngresoPuesto: null,

    direccionCorrespondencia: '',

    telefono: '',

    documentoEvaluador: '',

    acercadePeriodo: '',

    expectativasProceso: '',

    antecedentesOcupacionales: '',

    aspectosOrganizacionales: '',

    fechaCargo: null,

    idCargo: null,

    idArea: null,

    mision: '',

    proceso: '',

    caracteristicas: '',

    descripcionAgentes: '',

    aspectosIndividuales: '',

    totalIntralaboral: null,

    promedioIntralaboral: null,

    totalExtralaboral: null,

    promedioExtralaboral: null,

    promedioTotalExtralaboral: null,

    promedioTotalIntralaboral: null,

    condicionesIndividuo: ''
}
    });

            const {
                handleSubmit,
                reset,
                watch,
                setValue,
                formState: { errors }
            } = methods;

            const documento =
                watch('documento');
    // =========================
    // LOAD DATA
    // =========================

    useEffect(() => {

        async function getAll() {

            try {

                // =========================
                // EMPRESAS
                // =========================

                    const empresa =
    await ComboEmpresaAPT();

console.log(
    'EMPRESAS',
    empresa
);

const empresas =
    empresa?.data?.data || [];

const resultEmpresa =
    empresas.map((item) => ({

        value:
            item.codigo,

        label:
            item.label
    }));

setCompany(
    resultEmpresa
);
                // =========================
                // CATALOGOS
                // =========================

                const fuentes =
                    await GetByTipoCatalogoCombo(
                        CodCatalogo.APT_FUENTES
                    );

                const parentesco =
                    await GetByTipoCatalogoCombo(
                        CodCatalogo.APT_PARENTESCO
                    );

                const grupo =
                    await GetByTipoCatalogoCombo(
                        CodCatalogo.APT_GRUPO_CONDICION
                    );

                const condicion =
                    await GetByTipoCatalogoCombo(
                        CodCatalogo.APT_CONDICION
                    );

                const exposicion =
                    await GetByTipoCatalogoCombo(
                        CodCatalogo.APT_EXPOSICION
                    );

                const frecuencia =
                    await GetByTipoCatalogoCombo(
                        CodCatalogo.APT_FRECUENCIA
                    );

                const intensidad =
                    await GetByTipoCatalogoCombo(
                        CodCatalogo.APT_INTENSIDAD
                    );

                const tipo =
                    await GetByTipoCatalogoCombo(
                        CodCatalogo.APT_TIPO
                    );

                const cargo =
                    await GetByTipoCatalogoCombo(
                        CodCatalogo.APT_CARGO
                    );

                const area =
                    await GetByTipoCatalogoCombo(
                        CodCatalogo.APT_AREA
                    );

                const puesto =
                    await GetByTipoCatalogoCombo(
                        CodCatalogo.APT_PUESTO_TRABAJO
                    );

                setLsFuentes(
                    fuentes.data || []
                );

                setLsParentesco(
                    parentesco.data || []
                );

                setLsGrupoCondicion(
                    grupo.data || []
                );

                setLsCondicion(
                    condicion.data || []
                );

                setLsExposicion(
                    exposicion.data || []
                );

                setLsFrecuencia(
                    frecuencia.data || []
                );

                setLsIntensidad(
                    intensidad.data || []
                );

                setLsTipo(
                    tipo.data || []
                );

                setLsCargo(
                    cargo.data || []
                );

                setLsArea(
                    area.data || []
                );

                setLsPuestoTrabajo(
                    puesto.data || []
                );

            } catch (error) {

                console.log(error);

                toast.error(
                    'Error cargando datos'
                );
            }
        }

        getAll();

    }, []);

    // =========================
    // SAVE
    // =========================

  const handleSave = async (data) => {

    try {

        const payload = {

            // =====================
            // CAMPOS FORM
            // =====================

            Fecha:
                data.fecha,

            Documento:
                data.documento,

            IdEmpresa:
                data.idEmpresa,

            IdPuestoTrabajo:
                data.idPuestoTrabajo,

            FechaIngresoEmpresa:
                data.fechaIngresoEmpresa,

            FechaIngresoPuesto:
                data.fechaIngresoPuesto,

            DireccionCorrespondencia:
                data.direccionCorrespondencia,

            Telefono:
                data.telefono,

            DocumentoEvaluador:
                data.documentoEvaluador,

            AcercadePeriodo:
                data.acercadePeriodo,

            ExpectativasProceso:
                data.expectativasProceso,

            AntecedentesOcupacionales:
                data.antecedentesOcupacionales,

            AspectosOrganizacionales:
                data.aspectosOrganizacionales,

            FechaCargo:
                data.fechaCargo,

            IdCargo:
                data.idCargo,

            IdArea:
                data.idArea,

            Mision:
                data.mision,

            Proceso:
                data.proceso,

            Caracteristicas:
                data.caracteristicas,

            DescripcionAgentes:
                data.descripcionAgentes,

            AspectosIndividuales:
                data.aspectosIndividuales,

            TotalIntralaboral:
                data.totalIntralaboral,

            PromedioIntralaboral:
                data.promedioIntralaboral,

            TotalExtralaboral:
                data.totalExtralaboral,

            PromedioExtralaboral:
                data.promedioExtralaboral,

            PromedioTotalExtralaboral:
                data.promedioTotalExtralaboral,

            PromedioTotalIntralaboral:
                data.promedioTotalIntralaboral,

            CondicionesIndividuo:
                data.condicionesIndividuo,

            // =====================
            // DX
            // =====================

            DX1:
                dx1?.value || null,

            DX2:
                dx2?.value || null,

            DX3:
                dx3?.value || null,

            // =====================
            // DETALLES
            // =====================

            ListaFuentes:
                detalleFuentes || [],

            ListaAgentes:
                detalleAgentes || [],

            UsuarioRegistro:
                localStorage.getItem('user')
                || 'ADMIN'
        };

        console.log(
            'PAYLOAD',
            payload
        );

        const result =
            await InsertAPTCalificacion(
                payload
            );

        console.log(
            'RESULT',
            result
        );

        if (
            result?.data?.success
        ) {

            toast.success(
                'Registro guardado correctamente'
            );

            reset();

            setDetalleFuentes([]);

            setDetalleAgentes([]);

            setDx1(null);

            setDx2(null);

            setDx3(null);

        } else {

            toast.error(
                result?.data?.message ||
                'No se pudo guardar'
            );
        }

    } catch (error) {

        console.log(error);

        toast.error(
            'Error al guardar'
        );
    }
};

const handleDocumento = async (event) => {

    try {

        const document =
            event?.target?.value;

        setValue(
            'documento',
            document
        );

        if (document !== '') {

            const response =
                await GetByIdEmployee(
                    document
                );

            if (
                response?.data?.status === 200
            ) {

                const employee =
                    response.data.data;

                setModelEmployee(
                    employee
                );

                // ====================
                // AUTOCARGAR DATOS
                // ====================

                setValue(
                    'telefono',
                    employee?.telefono
                    || ''
                );

                setValue(
                    'direccionCorrespondencia',
                    employee?.direccion
                    || ''
                );

                setValue(
                    'idEmpresa',
                    employee?.empresa
                    || ''
                );

            } else {

                setModelEmployee([]);
            }

        } else {

            setModelEmployee([]);
        }

    } catch (error) {

        console.log(error);
    }
};

    const fieldSx = {
        '& .MuiInputBase-root': {
            minHeight: 56,
            borderRadius: 2
        },
        '& .MuiInputLabel-root': {
            fontSize: '0.95rem'
        },
        '& .MuiSelect-select': {
            minHeight: 24
        }
    };

    const textareaSx = {
        '& .MuiInputBase-root': {
            minHeight: 160,
            borderRadius: 2
        },
        '& .MuiInputBase-inputMultiline': {
            minHeight: 120
        }
    };

    const compactTextareaSx = {
        '& .MuiInputBase-root': {
            minHeight: 130,
            borderRadius: 2
        },
        '& .MuiInputBase-inputMultiline': {
            minHeight: 96
        }
    };

    return (
        <ValidateActionSkeleton
            idAccion={AccionMenu.agregar}
            idModulo={Modulo.APTCalificacion}
        >
            <FormProvider {...methods}>
                <Box sx={{ width: '100%', pb: 6 }}>
                    <Card
                        sx={{
                            mb: 3,
                            overflow: 'hidden',
                            borderRadius: 3,
                            backgroundColor: 'rgba(25, 118, 210, 0.04)',
                            color: 'text.primary',
                            boxShadow: theme.shadows[4]
                        }}
                    >
                     
                    </Card>

                    <Stack spacing={3}>
                        <SectionCard
                            icon={Person}
                            title="Calificación APT"
                            subtitle="Análisis de factores de riesgo psicosocial a nivel intra y extralaboral"
                        >
                            <Grid container spacing={2.5} sx={{ paddingRight: 3 }}>
                                <Grid item xs={12}>
                                    <ViewEmployee
                                        errors={errors}
                                        title="Empleado y contacto"
                                        key={modelEmployee?.documento}
                                        documento={documento}
                                        onChange={(e) =>
                                            setValue('documento', e.target.value)
                                        }
                                        lsEmployee={modelEmployee}
                                        handleDocumento={handleDocumento}
                                        handleEnter={handleDocumento}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <InputDatePicker
                                        name="fecha"
                                        label="Fecha"
                                        bug={errors.fecha}
                                        sx={fieldSx}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <InputText
                                        name="telefono"
                                        label="Teléfono"
                                        sx={fieldSx}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <InputText
                                        name="direccionCorrespondencia"
                                        label="Dirección"
                                        sx={fieldSx}
                                    />
                                </Grid>
                            </Grid>
                        </SectionCard>

                        <SectionCard
                            icon={BusinessCenter}
                            title="Información laboral"
                            subtitle="Datos de empresa, puesto y fechas de ingreso."
                        >
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} md={6}>
                                    <InputSelect
                                        defaultValue=""
                                        name="idEmpresa"
                                        label="Empresa"
                                        options={company}
                                        bug={errors.idEmpresa}
                                        sx={fieldSx}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputSelect
                                        name="idPuestoTrabajo"
                                        label="Puesto Trabajo"
                                        options={lsPuestoTrabajo}
                                        sx={fieldSx}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputDatePicker
                                        name="fechaIngresoEmpresa"
                                        label="Ingreso Empresa"
                                        sx={fieldSx}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputDatePicker
                                        name="fechaIngresoPuesto"
                                        label="Ingreso Puesto"
                                        sx={fieldSx}
                                    />
                                </Grid>
                            </Grid>
                        </SectionCard>

                        <SectionCard
                            icon={LocalHospital}
                            title="Diagnóstico"
                            subtitle="Selecciona uno o varios diagnósticos clínicos asociados al caso."
                        >
                            <DiagnosisAPT
                                dx1={dx1}
                                dx2={dx2}
                                dx3={dx3}
                                setDx1={setDx1}
                                setDx2={setDx2}
                                setDx3={setDx3}
                            />
                        </SectionCard>

                        <SectionCard
                            icon={SupervisorAccount}
                            title="Evaluador"
                            subtitle="Registra la persona responsable y el cargo de evaluación."
                        >
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} md={6}>
                                    <InputText
                                        name="documentoEvaluador"
                                        label="Documento Evaluador"
                                        sx={fieldSx}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputDatePicker
                                        name="fechaCargo"
                                        label="Fecha Cargo"
                                        sx={fieldSx}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputSelect
                                        name="idCargo"
                                        label="Cargo"
                                        options={lsCargo}
                                        sx={fieldSx}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputSelect
                                        name="idArea"
                                        label="Área"
                                        options={lsArea}
                                        sx={fieldSx}
                                    />
                                </Grid>
                            </Grid>
                        </SectionCard>

                        <SectionCard
                            icon={Description}
                            title="Narrativa y contexto"
                            subtitle="Describe el periodo, expectativas, antecedentes y aspectos organizacionales."
                        >
                            <Grid container spacing={2.5}>
                                <Grid item xs={12}>
                                    <InputText
                                        multiline
                                        rows={3}
                                        name="acercadePeriodo"
                                        label="Acerca del Período"
                                        sx={compactTextareaSx}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InputText
                                        multiline
                                        rows={3}
                                        name="expectativasProceso"
                                        label="Expectativas del Proceso"
                                        sx={compactTextareaSx}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InputText
                                        multiline
                                        rows={3}
                                        name="antecedentesOcupacionales"
                                        label="Antecedentes Ocupacionales"
                                        sx={compactTextareaSx}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InputText
                                        multiline
                                        rows={3}
                                        name="aspectosOrganizacionales"
                                        label="Aspectos Organizacionales"
                                        sx={compactTextareaSx}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InputText
                                        multiline
                                        rows={3}
                                        name="mision"
                                        label="Misión"
                                        sx={compactTextareaSx}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InputText
                                        multiline
                                        rows={3}
                                        name="proceso"
                                        label="Proceso"
                                        sx={compactTextareaSx}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InputText
                                        multiline
                                        rows={3}
                                        name="caracteristicas"
                                        label="Características"
                                        sx={compactTextareaSx}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InputText
                                        multiline
                                        rows={3}
                                        name="descripcionAgentes"
                                        label="Descripción Agentes"
                                        sx={compactTextareaSx}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InputText
                                        multiline
                                        rows={3}
                                        name="aspectosIndividuales"
                                        label="Aspectos Individuales"
                                        sx={compactTextareaSx}
                                    />
                                </Grid>
                            </Grid>
                        </SectionCard>

                        <SectionCard
                            icon={Description}
                            title="Fuentes y agentes"
                            subtitle="Registra fuentes y agentes con una edición más visual y compacta."
                        >
                            <Stack spacing={2.5}>
                                <DetailFuentes
                                    lsFuentes={lsFuentes}
                                    lsParentesco={lsParentesco}
                                    data={detalleFuentes}
                                    setData={setDetalleFuentes}
                                />
                                <DetailAgentes
                                    lsGrupoCondicion={lsGrupoCondicion}
                                    lsCondicion={lsCondicion}
                                    lsExposicion={lsExposicion}
                                    lsFrecuencia={lsFrecuencia}
                                    lsIntensidad={lsIntensidad}
                                    lsTipo={lsTipo}
                                    data={detalleAgentes}
                                    setData={setDetalleAgentes}
                                />
                            </Stack>
                        </SectionCard>

                        <SectionCard
                            icon={Assessment}
                            title="Resultados"
                            subtitle="Captura los valores de evaluación y condiciones finales del individuo."
                        >
                            <Grid container spacing={2.5}>
                                <Grid item xs={12}>
                                    <Grid container spacing={2.5}>
                                        <Grid item xs={12} md={4}>
                                            <ResultCard
                                                icon={Assessment}
                                                title="Total Intralaboral"
                                                value={watch('totalIntralaboral')}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <ResultCard
                                                icon={Assessment}
                                                title="Promedio Intralaboral"
                                                value={watch('promedioIntralaboral')}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <ResultCard
                                                icon={Assessment}
                                                title="Promedio Total Intralaboral"
                                                value={watch('promedioTotalIntralaboral')}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={2.5}>
                                        <Grid item xs={12} md={4}>
                                            <ResultCard
                                                icon={BusinessCenter}
                                                title="Total Extralaboral"
                                                value={watch('totalExtralaboral')}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <ResultCard
                                                icon={BusinessCenter}
                                                title="Promedio Extralaboral"
                                                value={watch('promedioExtralaboral')}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <ResultCard
                                                icon={BusinessCenter}
                                                title="Promedio Total Extralaboral"
                                                value={watch('promedioTotalExtralaboral')}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <InputText
                                        multiline
                                        rows={5}
                                        name="condicionesIndividuo"
                                        label="Condiciones Individuo"
                                        sx={textareaSx}
                                    />
                                </Grid>
                            </Grid>
                        </SectionCard>
                    </Stack>

                    <Card sx={{ mt: 3, borderRadius: 3 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Stack
                                direction={{ xs: 'column', md: 'row' }}
                                justifyContent="space-between"
                                alignItems={{ xs: 'stretch', md: 'center' }}
                                spacing={2}
                            >
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                        Listo para guardar
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Revisa cada sección y guarda el registro cuando estés listo.
                                    </Typography>
                                </Box>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                                    <AnimateButton>
                                        <Button
                                            variant="outlined"
                                            startIcon={<ArrowBack />}
                                            onClick={() => navigate('/apt-qualification/list')}
                                            sx={{ borderRadius: 2, px: 2.5, py: 1 }}
                                        >
                                            Cancelar
                                        </Button>
                                    </AnimateButton>
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            startIcon={<Save />}
                                            onClick={handleSubmit(handleSave)}
                                            sx={{
                                                borderRadius: 2,
                                                px: 2.5,
                                                py: 1,
                                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
                                            }}
                                        >
                                            Guardar
                                        </Button>
                                    </AnimateButton>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
            </FormProvider>
        </ValidateActionSkeleton>
    );
};

export default APTQualification;