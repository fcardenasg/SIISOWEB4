import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { Button, Grid } from "@mui/material";
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import { GetAllByCodeOrName } from "api/clients/CIE11Client";
import { GetComboCompany } from "api/clients/CompanyClient";
import { GetByIdEmployee } from "api/clients/EmployeeClient";
import { GetAllComboUser, GetAllUser } from "api/clients/UserClient";
import { CodCatalogo, TitleButton } from "components/helpers/Enums";
import InputDatePick from "components/input/InputDatePick";
import InputOnChange from "components/input/InputOnChange";
import InputSelect from "components/input/InputSelect";
import InputSelectAutocomplete from "components/input/InputSelectAutocomplete";
import InputText from "components/input/InputText";
import ViewEmployee from "components/views/ViewEmployee";
import toast from "react-hot-toast";
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import { InsertRehabilitationPlan } from "api/clients/RehabilitationPlanClient";
import axios from "axios";
import FullScreenModal from "components/controllers/FullScreenModal";
import { useBoolean } from "hooks/use-boolean";
import { Url } from "api/instances/AuthRoute";

const validationSchema = Yup.object().shape({
  documento: Yup.string().required("El documento es requerido")
});

const RehabilitationPlan = () => {
  const navigate = useNavigate();

  const loadingReport = useBoolean(false);
  const openReport = useBoolean(false);
  const [reportUrl, setReportUrl] = useState('');

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      documento: "",

      // Información General
      fechaIngreso: null,
      idCiudad: "",
      idMedico: "",
      idTipoContingencia: "",
      siniestroNumero: "",

      // Diagnósticos y Comorbilidad
      dx1: "",
      dx2: "",
      dx3: "",
      comorbilidad: "",

      // Detalles de Evolución
      resumenHistorico: "",
      evaluacion: "",
      rehabilitacionFuncional: "",
      rehabilitacionLaboral: "",
      pronosticoInicial: "",

      // Plan de Rehabilitación (PR)
      objetivosPR: "",
      metasPR: "",
      estrategiasPR: "",
      actividadesPR: "",
      tiempoCumplimientoPR: "",
      estadoCasosPR: "",
      idProfesionalPR: "",
      idProfesionalSeguimiento: "",
    },
  });

  const {
    handleSubmit,
    setValue, watch, reset,
    formState: { errors },
  } = methods;

  const [modelEmployee, setModelEmployee] = useState([]);
  const idRegistro = watch("idRegistro");
  const documento = watch("documento");
  const dx1 = watch("dx1");
  const dx2 = watch("dx2");
  const dx3 = watch("dx3");

  const [lsCiudad, setLsCiudad] = useState([]);
  const [lsMedico, setLsMedico] = useState([]);
  const [lsTipoContingencia, setLsTipoContingencia] = useState([]);
  const [lsEstadoCasos, setLsEstadoCasos] = useState([]);

  const [textDx1, setTextDx1] = useState('');
  const [textDx2, setTextDx2] = useState('');
  const [textDx3, setTextDx3] = useState('');
  const [lsDx1, setLsDx1] = useState([]);
  const [lsDx2, setLsDx2] = useState([]);
  const [lsDx3, setLsDx3] = useState([]);

  useEffect(() => {
    async function getCombos() {
      try {
        const [
          resCiudad,
          resContingencia,
          resEstadoCasos
        ] = await Promise.all([
          GetByTipoCatalogoCombo(CodCatalogo.CIUDADES),
          GetByTipoCatalogoCombo(CodCatalogo.Contingencia),
          GetByTipoCatalogoCombo(CodCatalogo.PR_ESTADO_CASO),
        ]);

        if (resCiudad?.data) setLsCiudad(resCiudad.data);
        if (resContingencia?.data) setLsTipoContingencia(resContingencia.data);
        if (resEstadoCasos?.data) setLsEstadoCasos(resEstadoCasos.data);

        const resUser = await GetAllUser();
        if (resUser?.status === 200) {
          var mapper = resUser.data.map((item) => ({
            value: item.id,
            label: item.nombre?.toUpperCase(),
            especialidad: item?.nombreEspacilidad,
          }));

          setLsMedico(mapper);
        }
      } catch (error) {
        toast.error("Error al cargar los combos del formulario");
      }
    }

    getCombos();
  }, []);

  const handleDocumento = async (event) => {
    try {
      const document = event?.target.value;
      setValue("documento", document, { shouldValidate: true });

      if (document !== '') {
        if (event.key === 'Enter' || event.type === 'blur') {
          var lsServerEmployee = await GetByIdEmployee(document);
          if (lsServerEmployee?.data.status === 200) {
            setModelEmployee(lsServerEmployee.data.data);
          } else {
            setModelEmployee([]);
            toast.error(lsServerEmployee?.data.message || "Empleado no encontrado");
          }
        }
      } else setModelEmployee([]);
    } catch (error) { }
  }

  const handleDx = async (event, dxType) => {
    const value = event.target.value;

    if (dxType === 1) setTextDx1(value);
    else if (dxType === 2) setTextDx2(value);
    else if (dxType === 3) setTextDx3(value);

    if (event.key === 'Enter' && value.trim()) {
      try {
        const { data } = await GetAllByCodeOrName(value.trim());
        switch (dxType) {
          case 1: setLsDx1(data); break;
          case 2: setLsDx2(data); break;
          case 3: setLsDx3(data); break;
          default: break;
        }
      } catch {
        toast.error('Error al buscar el diagnóstico');
      }
    } else if (event.key === 'Enter') {
      toast.error('Ingrese un código o nombre de diagnóstico');
    }
  };

  useEffect(() => {
    if (!dx1) {
      setLsDx1([]);
      setTextDx1('');
    }

    if (!dx2) {
      setLsDx2([]);
      setTextDx2('');
    }

    if (!dx3) {
      setLsDx3([]);
      setTextDx3('');
    }

    setValue('dx1', dx1);
    setValue('dx2', dx2);
    setValue('dx3', dx3);

  }, [dx1, dx2, dx3, setValue]);

  const handleMedico = (event) => {
    setValue("idMedico", event.target.value);
    const medico = lsMedico.find((item) => item.value === event.target.value);
    if (medico) {
      setValue("especialidad", medico?.especialidad?.toUpperCase());
    }
  };

  async function handleClickReport() {
    loadingReport.onTrue();
    openReport.onTrue();

    try {
      const response = await axios.get(`${Url.Base}${Url.PlanRehabilitacion}/report/${idRegistro}`, {
        responseType: 'blob',
        headers: {
          'Accept': 'application/pdf'
        }
      });

      if (response.data.type !== 'application/pdf') {
        throw new Error('El archivo recibido no es un PDF válido.');
      }

      const url = URL.createObjectURL(response.data);
      setReportUrl(url);
    } catch (err) {
      if (err.response?.data instanceof Blob && err.response.data.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = () => {
          const errorData = JSON.parse(reader.result);
          toast.error(errorData.message || 'Error al generar el reporte');
          openReport.onFalse();
        };

        reader.readAsText(err.response.data);
      } else {
        toast.error(err.message || 'No se pudo cargar el reporte.');
        openReport.onFalse();
      }
    } finally {
      setTimeout(() => {
        loadingReport.onFalse();
      }, 500);
    }
  }

  useEffect(() => {
    return () => {
      if (reportUrl) URL.revokeObjectURL(reportUrl);
    };
  }, [reportUrl]);

  const onSubmit = async (datos) => {
    try {
      datos.fechaIngreso = datos.fechaIngreso || null;
      datos.idCiudad = datos.comboCiudad ? datos.comboCiudad.value : null;
      datos.idMedico = datos.idMedico || null;
      datos.idTipoContingencia = datos.idTipoContingencia || null;
      datos.siniestroNumero = datos.siniestroNumero || null;

      datos.dx1 = datos.dx1 || null;
      datos.dx2 = datos.dx2 || null;
      datos.dx3 = datos.dx3 || null;
      datos.comorbilidad = datos.comorbilidad || null;

      datos.resumenHistorico = datos.resumenHistorico || null;
      datos.evaluacion = datos.evaluacion || null;
      datos.rehabilitacionFuncional = datos.rehabilitacionFuncional || null;
      datos.rehabilitacionLaboral = datos.rehabilitacionLaboral || null;
      datos.pronosticoInicial = datos.pronosticoInicial || null;

      datos.objetivosPR = datos.objetivosPR || null;
      datos.metasPR = datos.metasPR || null;
      datos.estrategiasPR = datos.estrategiasPR || null;
      datos.actividadesPR = datos.actividadesPR || null;
      datos.tiempoCumplimientoPR = datos.tiempoCumplimientoPR || null;
      datos.estadoCasosPR = datos.estadoCasosPR || null;
      datos.idProfesionalPR = datos.idProfesionalPR || null;
      datos.idProfesionalSeguimiento = datos.idProfesionalSeguimiento || null;

      const result = await InsertRehabilitationPlan(datos);
      if (result.status === 200) {
        console.log(result.data);
        toast.success("Registro guardado con éxito");
        setValue("documento", "");
        setModelEmployee([]);
        reset();

        setValue("idRegistro", result.data);
      } else
        toast.error("Error al guardar el registro");
    } catch (error) {
      toast.error(error.message || "Error al agregar el plan de rehabilitación");
    }
  };

  return (
    <FormProvider {...methods}>
      {openReport.value &&
        <FullScreenModal onClose={openReport.onFalse} loading={loadingReport.value}>
          <iframe
            src={`${reportUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            className="pdf-report-frame"
            title="Visualizador de Reporte"
            loading="lazy"
          />
        </FullScreenModal>
      }

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ViewEmployee
            errors={errors}
            title="Registrar plan de rehabilitación"
            key={modelEmployee?.documento}
            documento={documento}
            onChange={(e) => setValue("documento", e.target.value)}
            lsEmployee={modelEmployee}
            handleDocumento={handleDocumento}
          />
        </Grid>

        <Grid item xs={12}>
          <SubCard title="Información General">
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <InputDatePick
                  label="Fecha de ingreso"
                  name="fechaIngreso"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <InputSelectAutocomplete
                  name="comboCiudad"
                  label="Ciudad"
                  options={lsCiudad}
                  size="medium"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <InputSelect
                  name="idTipoContingencia"
                  label="Tipo de contingencia"
                  options={lsTipoContingencia}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <InputSelect
                  name="idMedico"
                  label="Médico"
                  options={lsMedico}
                  onChange={handleMedico}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <InputText
                  defaultValue=""
                  name="especialidad"
                  label="Especialidad"
                  disabled
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <InputText
                  name="siniestroNumero"
                  label="Número siniestro"
                />
              </Grid>
            </Grid>
          </SubCard>
        </Grid>

        <Grid item xs={12}>
          <SubCard title="Diagnósticos y Comorbilidad">
            <Grid container spacing={2}>
              <Grid item xs={4} md={2}>
                <InputOnChange
                  label="Buscar dx por palabras claves"
                  onKeyDown={(e) => handleDx(e, 1)}
                  onChange={(e) => setTextDx1(e?.target.value)}
                  value={textDx1}
                />
              </Grid>

              <Grid item xs={8} md={10}>
                <InputSelect
                  clearable
                  name="dx1"
                  label="Diagnóstico 1"
                  options={lsDx1}
                />
              </Grid>

              <Grid item xs={4} md={2}>
                <InputOnChange
                  label="Buscar dx por palabras claves"
                  onKeyDown={(e) => handleDx(e, 2)}
                  onChange={(e) => setTextDx2(e.target.value)}
                  value={textDx2}
                />
              </Grid>

              <Grid item xs={8} md={10}>
                <InputSelect
                  clearable
                  name="dx2"
                  label="Diagnóstico 2"
                  options={lsDx2}
                />
              </Grid>

              <Grid item xs={4} md={2}>
                <InputOnChange
                  label="Buscar dx por palabras claves"
                  onKeyDown={(e) => handleDx(e, 3)}
                  onChange={(e) => setTextDx3(e.target.value)}
                  value={textDx3}
                />
              </Grid>

              <Grid item xs={8} md={10}>
                <InputSelect
                  clearable
                  name="dx3"
                  label="Diagnóstico 3"
                  options={lsDx3}
                />
              </Grid>

              <Grid item xs={12}>
                <InputText
                  name="comorbilidad"
                  label="Comorbilidad"
                  fullWidth
                  bug={errors.comorbilidad}
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </SubCard>
        </Grid>

        <Grid item xs={12}>
          <SubCard title="Detalles de la Evolución">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputText name="resumenHistorico" label="Resumen de la historia" multiline rows={4} fullWidth bug={errors.resumenHistorico} />
              </Grid>
              <Grid item xs={12}>
                <InputText name="evaluacion" label="Evaluación de arcos de movimiento según la parte afectada" multiline rows={4} fullWidth bug={errors.evaluacion} />
              </Grid>
              <Grid item xs={12}>
                <InputText name="rehabilitacionFuncional" label="Rehabilitación funcional" multiline rows={4} fullWidth bug={errors.rehabilitacionFuncional} />
              </Grid>
              <Grid item xs={12}>
                <InputText name="rehabilitacionLaboral" label="Rehabilitación laboral" multiline rows={4} fullWidth bug={errors.rehabilitacionLaboral} />
              </Grid>
              <Grid item xs={12}>
                <InputText name="pronosticoInicial" label="Pronóstico inicial" multiline rows={4} fullWidth bug={errors.pronosticoInicial} />
              </Grid>
            </Grid>
          </SubCard>
        </Grid>

        {/* Sección: Plan de Acción */}
        <Grid item xs={12}>
          <SubCard title="Plan de Rehabilitación">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputText name="objetivosPR" label="Objetivos" multiline rows={4} fullWidth bug={errors.objetivosPR} />
              </Grid>

              <Grid item xs={12}>
                <InputText name="metasPR" label="Metas" multiline rows={4} fullWidth bug={errors.metasPR} />
              </Grid>

              <Grid item xs={12}>
                <InputText name="estrategiasPR" label="Estrategias" multiline rows={4} fullWidth bug={errors.estrategiasPR} />
              </Grid>

              <Grid item xs={12}>
                <InputText name="actividadesPR" label="Actividades" multiline rows={4} fullWidth bug={errors.actividadesPR} />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputText name="tiempoCumplimientoPR" label="Tiempo de cumplimiento" fullWidth bug={errors.tiempoCumplimientoPR} />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputSelect name="estadoCasosPR" label="Estado del caso" options={lsEstadoCasos} />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputSelect name="idProfesionalPR" label="Medico tratante" options={lsMedico} />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputSelect name="idProfesionalSeguimiento" label="Profesional quien realiza el seguimiento" options={lsMedico} />
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={4} lg={2}>
                    <AnimateButton>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(onSubmit)}
                      >
                        {TitleButton.Guardar}
                      </Button>
                    </AnimateButton>
                  </Grid>

                  <Grid item xs={2}>
                    <AnimateButton>
                      <Button disabled={idRegistro ? false : true} variant="outlined" fullWidth onClick={handleClickReport}>
                        {TitleButton.Imprimir}
                      </Button>
                    </AnimateButton>
                  </Grid>

                  <Grid item xs={6} md={4} lg={2}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="error"
                      onClick={() => navigate("/rehabilitation-plan/list")}
                    >
                      {TitleButton.Cancelar}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
      </Grid >
    </FormProvider >
  );
};

export default RehabilitationPlan;