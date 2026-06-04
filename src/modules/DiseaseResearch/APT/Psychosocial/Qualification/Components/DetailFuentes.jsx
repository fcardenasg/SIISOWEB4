import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InputDatePicker from "components/input/InputDatePicker";
import InputSelect from "components/input/InputSelect";
import InputText from "components/input/InputText";
import EmptyState from "components/loading/EmptyState";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DeleteFuenteAPT, GetAllFuentesAPT, SaveFuenteAPT } from "api/clients/APTRatingClient";
import AnimateButton from "ui-component/extended/AnimateButton";
import { CodCatalogo } from "components/helpers/Enums";
import { GetByTipoCatalogoCombo } from "api/clients/CatalogClient";
import swal from "sweetalert";
import { ParamDelete } from "components/alert/AlertAll";
import { FormatDate } from "components/helpers/Format";

const validationSchema = yup.object().shape({
  idFuentes: yup.string().required("La fuente es requerida"),
  idParentesco: yup.string().required("El parentesco es requerido"),
  descripcion: yup.string().required("La descripción es requerida"),
  lugar: yup.string().required("El lugar es requerido"),
  fecha: yup.string().required("La fecha es requerida").nullable(),
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E0E0E0",
    color: theme.palette.common.black,
    fontWeight: "bold",
    padding: "8px 12px",
    userSelect: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "6px 12px",
    userSelect: "none",
    cursor: "default",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme, isselected }) => ({
  backgroundColor: isselected ? "#bbdefb !important" : "inherit",
  borderLeft: isselected && `5px solid ${theme.palette.primary.main}`,
  transition: "all 0.2s ease",

  "&:nth-of-type(odd)": {
    backgroundColor: isselected ? "#bbdefb !important" : theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: isselected ? "#bbdefb !important" : "#f5f5f5",
    cursor: "pointer",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DetailFuentes = () => {
  const { watch: watchForm } = useFormContext();
  const idAPTCalificacion = watchForm("idAPTCalificacion");

  const [lsFuentes, setLsFuentes] = useState([]);
  const [lsParentesco, setLsParentesco] = useState([]);

  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      idFuentes: "",
      idParentesco: "",
      descripcion: "",
      lugar: "",
      fecha: "",
      isUpdateRegister: false
    }
  });

  const { handleSubmit, formState: { errors, isSubmitting }, reset, watch, setValue, getValues } = methods;
  const isUpdateRegister = watch('isUpdateRegister');

  useEffect(() => {
    if (idAPTCalificacion) {
      loadFuentes();
    }
  }, [idAPTCalificacion]);

  useEffect(() => {
    async function getData() {
      const lsServerFuente = await GetByTipoCatalogoCombo(CodCatalogo.APTPSICO_FUENTES);
      setLsFuentes(lsServerFuente.data);

      const lsServerParentesco = await GetByTipoCatalogoCombo(CodCatalogo.APTPSICO_PARENTESCO);
      setLsParentesco(lsServerParentesco.data);
    }

    getData();
  }, []);

  const loadFuentes = async () => {
    try {
      setLoading(true);
      const response = await GetAllFuentesAPT(idAPTCalificacion);
      if (response.data.exito) {
        setData(response.data.datos || []);
      }
    } catch (error) {
      console.error("Error al cargar fuentes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    reset({
      idFuentes: "",
      idParentesco: "",
      descripcion: "",
      lugar: "",
      fecha: "",
      isUpdateRegister: false
    });
    setSelectedId(null);
  };

  const handleDoubleClick = (item) => {
    setValue('idFuentes', item.idFuentes, { shouldValidate: true });
    setValue('idParentesco', item.idParentesco, { shouldValidate: true });
    setValue('descripcion', item.descripcion, { shouldValidate: true });
    setValue('lugar', item.lugar, { shouldValidate: true });
    setValue('fecha', FormatDate(item.fecha), { shouldValidate: true });
    setValue('isUpdateRegister', true);
    setSelectedId(item.id);
  };

  const handleClick = async (datos) => {
    try {
      setLoading(true);

      const fuenteData = {
        ...datos,
        idAPTCalificacion: idAPTCalificacion,
        id: selectedId || 0
      };

      const response = await SaveFuenteAPT(fuenteData);

      if (response.data.exito) {
        await loadFuentes();
        handleClear();
      }
    } catch (error) {
      console.error("Error al guardar fuente:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (idDetalleFuente) => {
    try {
      swal(ParamDelete).then(async (willDelete) => {
        if (willDelete) {
          try {
            setLoading(true);
            const response = await DeleteFuenteAPT(idDetalleFuente);

            if (response?.data?.exito) {
              await loadFuentes();
              if (selectedId === idDetalleFuente) {
                handleClear();
              }
            }
          } catch (error) {
            console.error("Error al eliminar fuente:", error);
          } finally {
            setLoading(false);
          }
        }
      });
    } catch (error) {
      console.error("Error al mostrar alerta de eliminación:", error);
    }
  };

  const isFormDisabled = !idAPTCalificacion || loading || isSubmitting;

  return (
    <FormProvider {...methods}>
      <Box>
        <Card sx={{ mb: 3, border: "1px solid #e0e0e0", borderRadius: "12px" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, fontSize: "1.1rem" }}>
              Detalle de Fuentes
            </Typography>

            {!idAPTCalificacion && (
              <Box sx={{ mb: 3.5 }}>
                <Alert severity="warning" variant="outlined" sx={{ borderRadius: "8px" }}>
                  Debe guardar la calificación principal primero para poder registrar fuentes de información.
                </Alert>
              </Box>
            )}

            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                  options={lsFuentes}
                  name="idFuentes"
                  label="Fuente"
                  disabled={isFormDisabled}
                  bug={errors.idFuentes}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <InputSelect
                  options={lsParentesco}
                  name="idParentesco"
                  label="Parentesco"
                  disabled={isFormDisabled}
                  bug={errors.idParentesco}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <InputText
                  name="descripcion"
                  label="Descripción"
                  disabled={isFormDisabled}
                  bug={errors.descripcion}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <InputText
                  name="lugar"
                  label="Lugar"
                  disabled={isFormDisabled}
                  bug={errors.lugar}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <InputDatePicker
                  name="fecha"
                  label="Fecha"
                  disabled={isFormDisabled}
                  bug={errors.fecha}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Stack direction="row" spacing={1.5}>
                  <AnimateButton>
                    <Button
                      variant="contained"
                      onClick={handleSubmit(handleClick)}
                      disabled={isFormDisabled}
                      startIcon={selectedId !== null ? <EditIcon /> : <AddCircleIcon />}
                      sx={{
                        height: "40px",
                        fontWeight: "bold",
                        textTransform: "none",
                        px: 3,
                        borderRadius: 2,
                      }}
                    >
                      {isSubmitting ? "Guardando..." : (selectedId !== null ? "Actualizar" : "Agregar")}
                    </Button>
                  </AnimateButton>

                  <AnimateButton>
                    <Button
                      variant="outlined"
                      onClick={handleClear}
                      disabled={isFormDisabled}
                      startIcon={<ClearAllIcon />}
                      sx={{
                        height: "40px",
                        textTransform: "none",
                        px: 3,
                        borderRadius: 2,
                      }}
                    >
                      Limpiar
                    </Button>
                  </AnimateButton>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ border: "1px solid #e0e0e0", borderRadius: "12px", overflow: "hidden" }}>
          <TableContainer component={Paper} sx={{ elevation: 0 }}>
            <Table sx={{ minWidth: 650 }} size="medium">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Fuente</StyledTableCell>
                  <StyledTableCell>Parentesco</StyledTableCell>
                  <StyledTableCell>Descripción</StyledTableCell>
                  <StyledTableCell>Lugar</StyledTableCell>
                  <StyledTableCell>Fecha</StyledTableCell>
                  <StyledTableCell align="center">Acciones</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.length > 0 ? (
                  data.map((item) => (
                    <StyledTableRow
                      key={item.id}
                      isselected={selectedId === item.id ? 1 : 0}
                      onDoubleClick={() => !isFormDisabled && handleDoubleClick(item)}
                    >
                      <StyledTableCell>{item.nombreFuente}</StyledTableCell>
                      <StyledTableCell>{item.nombreParentesco}</StyledTableCell>
                      <StyledTableCell>{item.descripcion}</StyledTableCell>
                      <StyledTableCell>{item.lugar}</StyledTableCell>
                      <StyledTableCell>{item.fecha ? new Date(item.fecha).toLocaleDateString() : ''}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Tooltip disableInteractive placement="top" title="Actualizar">
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => handleDoubleClick(item)}
                              disabled={isFormDisabled}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip disableInteractive placement="top" title="Eliminar">
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDelete(item.id)}
                              disabled={isFormDisabled}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={6} align="center">
                      <EmptyState seeSubtitle={false} title="No hay registros" />
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </FormProvider>
  );
};

export default DetailFuentes;