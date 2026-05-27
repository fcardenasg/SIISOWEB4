import { yupResolver } from '@hookform/resolvers/yup';

import {
    Button,
    Divider,
    Grid
} from '@mui/material';

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
    useNavigate,
    useParams
} from 'react-router-dom';

import * as yup from 'yup';

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
    UpdateAPTCalificacion,
    GetByIdAPTCalificacion
} from 'api/clients/APTRatingClient';

import {
    GetByTipoCatalogoCombo
} from 'api/clients/CatalogClient';

import {
    GetByIdCIE11
} from 'api/clients/CIE11Client';

const validationSchema = yup.object().shape({

    fecha: yup
        .date()
        .required('La fecha es requerida'),

    documento: yup
        .string()
        .required('El documento es requerido'),

    idEmpresa: yup
        .number()
        .required('La empresa es requerida')
});

const UpdateAPTQualification = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    // =========================
    // COMBOS
    // =========================

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

            idAPTCalificacion: 0,

            fecha: new Date(),

            documento: '',

            idEmpresa: '',

            idPuestoTrabajo: '',

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

            idCargo: '',

            idArea: '',

            mision: '',

            proceso: '',

            caracteristicas: '',

            descripcionAgentes: '',

            aspectosIndividuales: '',

            totalIntralaboral: '',

            promedioIntralaboral: '',

            totalExtralaboral: '',

            promedioExtralaboral: '',

            promedioTotalExtralaboral: '',

            promedioTotalIntralaboral: '',

            condicionesIndividuo: ''
        }
    });

    const {
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = methods;

    // =========================
    // LOAD
    // =========================

    useEffect(() => {

        async function getData() {

            try {

                // =========================
                // COMBOS
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
                    fuentes.data
                );

                setLsParentesco(
                    parentesco.data
                );

                setLsGrupoCondicion(
                    grupo.data
                );

                setLsCondicion(
                    condicion.data
                );

                setLsExposicion(
                    exposicion.data
                );

                setLsFrecuencia(
                    frecuencia.data
                );

                setLsIntensidad(
                    intensidad.data
                );

                setLsTipo(
                    tipo.data
                );

                setLsCargo(
                    cargo.data
                );

                setLsArea(
                    area.data
                );

                setLsPuestoTrabajo(
                    puesto.data
                );

                // =========================
                // DATA
                // =========================

                const result =
                    await GetByIdAPTCalificacion(id);

                const data =
                    result.data.data;

                reset({

                    idAPTCalificacion:
                        data.idAPTCalificacion,

                    fecha:
                        data.fecha,

                    documento:
                        data.documento,

                    idEmpresa:
                        data.idEmpresa,

                    idPuestoTrabajo:
                        data.idPuestoTrabajo,

                    fechaIngresoEmpresa:
                        data.fechaIngresoEmpresa,

                    fechaIngresoPuesto:
                        data.fechaIngresoPuesto,

                    direccionCorrespondencia:
                        data.direccionCorrespondencia,

                    telefono:
                        data.telefono,

                    documentoEvaluador:
                        data.documentoEvaluador,

                    acercadePeriodo:
                        data.acercadePeriodo,

                    expectativasProceso:
                        data.expectativasProceso,

                    antecedentesOcupacionales:
                        data.antecedentesOcupacionales,

                    aspectosOrganizacionales:
                        data.aspectosOrganizacionales,

                    fechaCargo:
                        data.fechaCargo,

                    idCargo:
                        data.idCargo,

                    idArea:
                        data.idArea,

                    mision:
                        data.mision,

                    proceso:
                        data.proceso,

                    caracteristicas:
                        data.caracteristicas,

                    descripcionAgentes:
                        data.descripcionAgentes,

                    aspectosIndividuales:
                        data.aspectosIndividuales,

                    totalIntralaboral:
                        data.totalIntralaboral,

                    promedioIntralaboral:
                        data.promedioIntralaboral,

                    totalExtralaboral:
                        data.totalExtralaboral,

                    promedioExtralaboral:
                        data.promedioExtralaboral,

                    promedioTotalExtralaboral:
                        data.promedioTotalExtralaboral,

                    promedioTotalIntralaboral:
                        data.promedioTotalIntralaboral,

                    condicionesIndividuo:
                        data.condicionesIndividuo
                });

                setDetalleFuentes(
                    data.listaFuentes || []
                );

                setDetalleAgentes(
                    data.listaAgentes || []
                );

                // =========================
                // DX
                // =========================

                if (data.dx1) {

                    const cie1 =
                        await GetByIdCIE11(
                            data.dx1
                        );

                    setDx1(
                        cie1.data.data
                    );
                }

                if (data.dx2) {

                    const cie2 =
                        await GetByIdCIE11(
                            data.dx2
                        );

                    setDx2(
                        cie2.data.data
                    );
                }

                if (data.dx3) {

                    const cie3 =
                        await GetByIdCIE11(
                            data.dx3
                        );

                    setDx3(
                        cie3.data.data
                    );
                }

            } catch (error) {

                console.log(error);

                toast.error(
                    'Error cargando información'
                );
            }
        }

        getData();

    }, [id, reset]);

    // =========================
    // UPDATE
    // =========================

    const handleUpdate = async (data) => {

        try {

            if (
                detalleFuentes.length === 0
            ) {

                toast.error(
                    'Debe agregar fuentes'
                );

                return;
            }

            if (
                detalleAgentes.length === 0
            ) {

                toast.error(
                    'Debe agregar agentes'
                );

                return;
            }

            const payload = {

                ...data,

                dx1:
                    dx1?.idCIE11 || null,

                dx2:
                    dx2?.idCIE11 || null,

                dx3:
                    dx3?.idCIE11 || null,

                listaFuentes:
                    detalleFuentes,

                listaAgentes:
                    detalleAgentes,

                usuarioModifico:
                    localStorage.getItem(
                        'user'
                    ) || 'ADMIN'
            };

            const result =
                await UpdateAPTCalificacion(
                    payload
                );

            if (
                result?.data?.exito
            ) {

                toast.success(
                    result.data.mensaje
                );

                navigate(
                    '/aptcalificacion/list'
                );

            } else {

                toast.error(
                    result?.data?.mensaje ||
                    'Error al actualizar'
                );
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.message
            );
        }
    };

    return (

        <ValidateActionSkeleton
            idAccion={
                AccionMenu.editar
            }
            idModulo={
                Modulo.APTCalificacion
            }
        >

            <FormProvider {...methods}>

                <Grid
                    container
                    spacing={2}
                >

                      {/* ========================= */}
                        {/* EMPLEADO */}
                        {/* ========================= */}

                        <Grid item xs={12} md={4}>

                            <InputText
                                name="documento"
                                label="Documento"
                                disabled
                                bug={errors.documento}
                            />

                        </Grid>

                        <Grid item xs={12} md={4}>

                            <InputText
                                name="telefono"
                                label="Teléfono"
                            />

                        </Grid>

                        <Grid item xs={12} md={4}>

                            <InputText
                                name="direccionCorrespondencia"
                                label="Dirección"
                            />

                        </Grid>

                    {/* ========================= */}
                    {/* INFORMACION */}
                    {/* ========================= */}

                    <Grid item xs={12} md={3}>

                        <InputDatePicker
                            name="fecha"
                            label="Fecha"
                            bug={errors.fecha}
                        />

                    </Grid>

                    <Grid item xs={12} md={3}>

                        <InputSelect
                            name="idPuestoTrabajo"
                            label="Puesto Trabajo"
                            options={lsPuestoTrabajo}
                        />

                    </Grid>

                    <Grid item xs={12} md={3}>

                        <InputDatePicker
                            name="fechaIngresoEmpresa"
                            label="Ingreso Empresa"
                        />

                    </Grid>

                    <Grid item xs={12} md={3}>

                        <InputDatePicker
                            name="fechaIngresoPuesto"
                            label="Ingreso Puesto"
                        />

                    </Grid>

                    {/* ========================= */}
                    {/* DX */}
                    {/* ========================= */}

                    <Grid item xs={12}>

                        <DiagnosisAPT
                            dx1={dx1}
                            dx2={dx2}
                            dx3={dx3}
                            setDx1={setDx1}
                            setDx2={setDx2}
                            setDx3={setDx3}
                        />

                    </Grid>

                    {/* ========================= */}
                    {/* EVALUACION */}
                    {/* ========================= */}

                    <Grid item xs={12} md={4}>

                        <InputText
                            name="documentoEvaluador"
                            label="Documento Evaluador"
                        />

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <InputDatePicker
                            name="fechaCargo"
                            label="Fecha Cargo"
                        />

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <InputSelect
                            name="idCargo"
                            label="Cargo"
                            options={lsCargo}
                        />

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <InputSelect
                            name="idArea"
                            label="Área"
                            options={lsArea}
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <InputText
                            name="mision"
                            label="Misión"
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <InputText
                            multiline
                            rows={3}
                            name="acercadePeriodo"
                            label="Acerca del Periodo"
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <InputText
                            multiline
                            rows={3}
                            name="expectativasProceso"
                            label="Expectativas"
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <InputText
                            multiline
                            rows={3}
                            name="antecedentesOcupacionales"
                            label="Antecedentes"
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <InputText
                            multiline
                            rows={3}
                            name="aspectosOrganizacionales"
                            label="Aspectos Organizacionales"
                        />

                    </Grid>

                    {/* ========================= */}
                    {/* DETALLE FUENTES */}
                    {/* ========================= */}

                    <Grid item xs={12}>

                        <DetailFuentes
                            lsFuentes={lsFuentes}
                            lsParentesco={lsParentesco}
                            data={detalleFuentes}
                            setData={setDetalleFuentes}
                        />

                    </Grid>

                    {/* ========================= */}
                    {/* DETALLE AGENTES */}
                    {/* ========================= */}

                    <Grid item xs={12}>

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

                    </Grid>

                    {/* ========================= */}
                    {/* RESULTADOS */}
                    {/* ========================= */}

                    <Grid item xs={12} md={4}>

                        <InputText
                            name="totalIntralaboral"
                            label="Total Intralaboral"
                        />

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <InputText
                            name="promedioIntralaboral"
                            label="Promedio Intralaboral"
                        />

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <InputText
                            name="totalExtralaboral"
                            label="Total Extralaboral"
                        />

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <InputText
                            name="promedioExtralaboral"
                            label="Promedio Extralaboral"
                        />

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <InputText
                            name="promedioTotalExtralaboral"
                            label="Promedio Total Extralaboral"
                        />

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <InputText
                            name="promedioTotalIntralaboral"
                            label="Promedio Total Intralaboral"
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <InputText
                            multiline
                            rows={3}
                            name="condicionesIndividuo"
                            label="Condiciones Individuo"
                        />

                    </Grid>

                    {/* ========================= */}
                    {/* BOTONES */}
                    {/* ========================= */}

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>

                        <Grid
                            container
                            spacing={2}
                            justifyContent="flex-end"
                        >

                            <Grid item xs={12} md={2}>

                                <AnimateButton>

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={handleSubmit(
                                            handleUpdate
                                        )}
                                    >
                                        {
                                            TitleButton.Actualizar
                                        }
                                    </Button>

                                </AnimateButton>

                            </Grid>

                            <Grid item xs={12} md={2}>

                                <AnimateButton>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() =>
                                            navigate(
                                                '/apt-qualification/list'
                                            )
                                        }
                                    >
                                        {
                                            TitleButton.Cancelar
                                        }
                                    </Button>

                                </AnimateButton>

                            </Grid>

                        </Grid>

                    </Grid>

                </Grid>

            </FormProvider>

        </ValidateActionSkeleton>
    );
};

export default UpdateAPTQualification;