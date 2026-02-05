import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Material UI & Components
import { Grid, Button, Typography, Box } from "@mui/material";
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import { TitleButton } from "components/helpers/Enums";
import InputText from "components/input/InputText";
import InputDatePick from "components/input/InputDatePick";
import InputSelect from "components/input/InputSelect";
import ViewEmployee from "components/views/ViewEmployee";
import { GetByIdEmployee } from "api/clients/EmployeeClient";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  documento: Yup.string().required("El documento es requerido"),
  idEmpresa: Yup.string().required("La empresa es requerida"),
  fechaIngreso: Yup.date().nullable().required("La fecha es requerida"),
});

const RehabilitationPlan = () => {
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      estado: true,
      dx1: "",
      dx2: "",
      dx3: "",
    },
  });
  

const labelBoxStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#f8f9fa',
        border: '1px solid #e3e8ef',
        borderRadius: '8px',
        color: '#697586'
    };

  const {
    handleSubmit,
    setValue,watch,
    formState: { errors },
  } = methods;

  const [modelEmployee, setModelEmployee] = useState([]);
const documento = watch("documento");

const sectionTitleStyle = { color: '#f44336', fontWeight: 600 };

const handleDocumento = async (event) => {
        try {
            const document = event?.target.value;
            setValue("documento", document, { shouldValidate: true });

            if (document !== '') {
                if (event.key === 'Enter') {
                    var lsServerEmployee = await GetByIdEmployee(document);

                    if (lsServerEmployee?.data.status === 200) {
                        setModelEmployee(lsServerEmployee.data.data);
                    } else {
                        setModelEmployee(lsServerEmployee?.data.data);
                        toast.error(lsServerEmployee?.data.message);
                    }
                } else {
                    var lsServerEmployee = await GetByIdEmployee(document);
                    if (lsServerEmployee.data.status === 200) {
                        setModelEmployee(lsServerEmployee.data.data);
                    }
                }
            } else setModelEmployee([]);
        } catch (error) { }
    }


  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
  };



  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ViewEmployee

            errors={errors}
            title="Asignación de investigación"
            key={modelEmployee?.documento}
            documento={documento}
            onChange={(e) => setValue("documento", e.target.value)}
            lsEmployee={modelEmployee}
            handleDocumento={handleDocumento}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            {/* SECCIÓN 1: DATOS GENERALES */}
            <Grid item xs={12}>
              <SubCard title="Información General">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <InputText
                      name="documento"
                      label="Documento Identidad"
                      bug={errors.documento}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputText
                      name="idEmpresa"
                      label="ID Empresa"
                      bug={errors.idEmpresa}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputDatePick name="fechaIngreso" label="Fecha Ingreso" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputSelect name="idCiudad" label="Ciudad" options={[]} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputSelect
                      name="idTipoContingencia"
                      label="Tipo Contingencia"
                      options={[]}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputText
                      name="sinisestroNumero"
                      label="Número de Siniestro"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>

            {/* SECCIÓN 2: DIAGNÓSTICOS Y EVALUACIÓN */}
             <Grid item xs={12}>
                            <SubCard title={<Typography variant="h4" sx={sectionTitleStyle}>Diagnóstico y Evaluación</Typography>}>

                                <Grid container spacing={2}>
                                    
                                    {/* DX 1 */}
                                    
                                    <Grid item xs={12} md={9}>
                                        <InputSelect name="dx1" label="Seleccione Diagnóstico 1" options={[]} />
                                    </Grid>

                                    {/* DX 2 */}

                                    
                                    <Grid item xs={12} md={3}>
                                        <Box sx={labelBoxStyle}>
                                            <Typography variant="body2">Dx 2</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <InputSelect name="dx2" label="Seleccione Diagnóstico 2" options={[]} />
                                    </Grid>

                                    {/* DX 3 */}
                                    <Grid item xs={12} md={3}>
                                        <Box sx={labelBoxStyle}>
                                            <Typography variant="body2">Dx 3</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <InputSelect name="dx3" label="Seleccione Diagnóstico 3" options={[]} />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <InputText name="comorvilidad" label="Comorbilidad" multiline rows={2} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputText name="resumenHistorico" label="Resumen Histórico" multiline rows={2} fullWidth />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputText name="evaluacion" label="Evaluación Actual" multiline rows={3} fullWidth />
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
            {/* SECCIÓN 3: PLAN DE ACCIÓN */}
            <Grid item xs={12}>
              <SubCard title="Plan de Acción y Metas">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <InputText
                      name="reabilitacionFuncional"
                      label="Rehabilitación Funcional"
                      multiline
                      rows={2}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputText
                      name="rehabilitacionLaboral"
                      label="Rehabilitación Laboral"
                      multiline
                      rows={2}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputText
                      name="pronosticoInicial"
                      label="Pronóstico Inicial"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputText name="objetivosPR" label="Objetivos" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputText name="metasPR" label="Metas" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputText
                      name="estrategiasPR"
                      label="Estrategias"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputText
                      name="actividadesPR"
                      label="Actividades"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputText
                      name="tiempoCumplimientoPR"
                      label="Tiempo de Cumplimiento"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>

            {/* BOTONES DE ACCIÓN */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 1,
                }}
              >
                <AnimateButton>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/rehabilitation-plan/list")}
                  >
                    {TitleButton.Cancelar}
                  </Button>
                </AnimateButton>
                <AnimateButton>
                  <Button type="submit" variant="contained">
                    {TitleButton.Guardar}
                  </Button>
                </AnimateButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
    </FormProvider>
  );
};

export default RehabilitationPlan;
