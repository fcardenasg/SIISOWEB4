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
import { GetByIdHistoricalBurdenDiseases } from "api/clients/HistoricalBurdenDiseases";
import { motion } from "framer-motion";
import VisualizatorFile from "./VisualizatorFile";
import { base64ToWord } from "./serviceSisso";
import ControlModalView from "components/controllers/ControlModalView";
import { useBoolean } from "hooks/use-boolean";

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

  const confirmModalDocx = useBoolean();
  const confirmExport = useBoolean();

  async function getAll() {
    try {
      console.log("id", id);
      const response = await GetByIdHistoricalBurdenDiseases(id);
      if (response.data.exito) {
        console.log("response.data.datos.bat64", response.data.datos);
        const bat64 = await base64ToWord(
          response.data.datos.bat64,
          "documeto.docx"
        );
        setFile(bat64);
        setTimeWait(true);
      }
      console.log("response", response);
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
      console.log("Hay arhiv");
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

  return (
    <ValidateActionSkeleton
      idAccion={AccionMenu.actualizar}
      idModulo={Modulo.Empleado}
    >
      <MainCard>
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
                  <Grid item xs={12} md={10} lg={10}>
                    <Typography variant="h4">
                      Investigación de enfermedad laboral
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={2} lg={2} sx={{display:"flex",justifyContent:"flex-end"}}>
                    <AnimateButton>
                      <Tooltip title="Exportar">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={confirmExport.onTrue}
                          size="small"
                        >
                          Exportar pdf
                        </Button>
                      </Tooltip>
                    </AnimateButton>
                  </Grid>
                </Grid>
              }
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <VisualizatorFile
                    file={file}
                    confirmExport={confirmExport.value}
                  />
                </Grid>
              </Grid>
            </SubCard>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <Grid container spacing={2}>
                {/* <Grid item xs={6} md={4} lg={2}>
                  <AnimateButton>
                    <Button
                      variant="contained"
                      onClick={() => console.log("presionado")}
                      fullWidth
                    >
                      {TitleButton.Actualizar}
                    </Button>
                  </AnimateButton>
                </Grid> */}
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
      </MainCard>
    </ValidateActionSkeleton>
  );
};

export default UpdateHistoricalBurdenDiseases;
