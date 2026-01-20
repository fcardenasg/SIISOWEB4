import { useCallback, useEffect, useRef, useState } from "react";

// Import de Material-ui
import {
  Button,
  Grid,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Terceros
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";

import { MessageError, MessageUpdate } from "components/alert/AlertAll";

// Import del Proyecto
import {
  GetAllBySubTipoCatalogo,
  GetAllByTipoCatalogo,
} from "api/clients/CatalogClient";
import { GetAllCompany } from "api/clients/CompanyClient";
import { GetByIdEmployee, UpdateEmployees } from "api/clients/EmployeeClient";
import userEmpleado from "assets/img/user.png";
import ModalChildren from "components/form/ModalChildren";
import PhotoModel from "components/form/PhotoModel";
import WebCamCapture from "components/form/WebCam";
import {
  AccionMenu,
  CodCatalogo,
  DefaultValue,
  Message,
  Modulo,
  TitleButton,
  ValidationMessage,
} from "components/helpers/Enums";
import InputDatePicker from "components/input/InputDatePicker";
import InputSelect from "components/input/InputSelect";
import InputText from "components/input/InputText";
import SelectOnChange from "components/input/SelectOnChange";
import Cargando from "components/loading/Cargando";
import ValidateActionSkeleton from "components/ValidateAction/ValidateActionSkeleton";
import useAuth from "hooks/useAuth";
import { SNACKBAR_OPEN } from "store/actions";
import MainCard from "ui-component/cards/MainCard";
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import {
  GetByIdHistoricalBurdenDiseases,
  GetByIdPDF,
} from "api/clients/HistoricalBurdenDiseases";
import { motion } from "framer-motion";
import VisualizatorFile from "./VisualizatorFile";
import { base64ToWord } from "./serviceSisso";
import ControlModalView from "components/controllers/ControlModalView";
import { useBoolean } from "hooks/use-boolean";
import RightDrawer from "components/components/RightDrawer";
import ChatIA from "./ChatIA";

const validationSchema = yup.object().shape({});

const UpdateHistoricalBurdenDiseases = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { user } = useAuth();
  const dispatch = useDispatch();
  const WebCamRef = useRef(null);
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [openUpdate, setOpenUpdate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openError, setOpenError] = useState(false);

  const [timeWait, setTimeWait] = useState(false);
  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [informe, setInforme] = useState();

  const confirmModalDocx = useBoolean();
  const confirm = useBoolean();

  async function getAll() {
    try {
      const response = await GetByIdPDF(id);
      if (response.data.exito) {
        const { bat64, nombres, informe } = response.data.datos;
        setFile(bat64);
        setName(nombres);
        setInforme(informe);
        setTimeWait(true);
      }
    } catch (error) {
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: `${error}`,
        variant: "alert",
        alertSeverity: "error",
        close: false,
        transition: "SlideUp",
      });
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (file) {
      confirmModalDocx.onTrue();
    }
  }, [file]);

  const methods = useForm({ resolver: yupResolver(validationSchema) });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  const values = watch();

  const handleExport = async () => {
    const link = document.createElement("a");
    link.href = file;
    link.download = name + ".pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleIA = () => {
    confirm.onTrue();
  };

  return (
    <>
      <RightDrawer
        open={confirm.value}
        onClose={confirm.onFalse}
        title={
          <>
            <Typography variant="h4">
              Investigación de enfermedad laboral
            </Typography>
            <Typography
              variant="h4"
              color="primary.main"
              sx={{ fontSize: "1rem", fontWeight: "normal" }}
            >
              {name}
            </Typography>
          </>
        }
        width="40%"
        children={<ChatIA informe={informe} />}
      />

      <ValidateActionSkeleton
        idAccion={AccionMenu.actualizar}
        idModulo={Modulo.Empleado}
      >
        {confirmModalDocx.value ? (
          <FormProvider {...methods}>
            <MessageUpdate
              open={openUpdate}
              onClose={() => setOpenUpdate(false)}
            />
            <MessageError
              error={errorMessage}
              open={openError}
              onClose={() => setOpenError(false)}
            />

            <SubCard
              sx={{ mb: 2 }}
              darkTitle
              title={
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8} lg={8}>
                    <Typography variant="h4">
                      Investigación de enfermedad laboral
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: theme.palette.primary.main,
                        weight: "normal",
                      }}
                    >
                      {name}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    lg={4}
                    sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
                  >
                    <AnimateButton>
                      <Tooltip title="Exportar">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleExport}
                          size="small"
                        >
                          Exportar pdf
                        </Button>
                      </Tooltip>
                    </AnimateButton>
                    <AnimateButton>
                      <Tooltip title="Exportar">
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={handleIA}
                          size="small"
                        >
                          SIISO IA
                        </Button>
                      </Tooltip>
                    </AnimateButton>
                  </Grid>
                </Grid>
              }
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  {file ? (
                    <iframe
                      src={file}
                      title="Vista previa del PDF"
                      width="100%"
                      height="600px"
                      style={{ border: "none" }}
                    />
                  ) : (
                    <div>Cargando PDF...</div>
                  )}
                </Grid>
              </Grid>
            </SubCard>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={4} lg={2}>
                  <AnimateButton>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => navigate("/ListHistoricalBurdenDiseases")}
                    >
                      {TitleButton.Cancelar}
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </Grid>
          </FormProvider>
        ) : (
          <Cargando />
        )}
      </ValidateActionSkeleton>
    </>
  );
};

export default UpdateHistoricalBurdenDiseases;
