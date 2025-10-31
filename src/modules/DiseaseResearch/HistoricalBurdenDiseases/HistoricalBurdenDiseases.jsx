import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import FormProvider from 'src/components/hook-form/form-provider';

// import animation from "src/assets/img/animation.json";

import Lottie from "lottie-react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import { UploadBoxPdf } from 'src/components/input/InputUploadFile';
import { useCallback, useEffect, useState } from "react";
import ItemUpload from "./ItemUpload";
// import { enqueueSnackbar } from "notistack";

// import ModalBasic from "./ModalBasic";
// import { useBoolean } from "src/hooks/use-boolean";

// import { useAuthContext } from "src/auth/hooks";

// import RobotBot from 'src/assets/img/lottieAnimation/Robot-Bot.json';
// import animationloader from "src/assets/img/lottieAnimation/animationloader";
// import CustomizedSteppers from "./ProgressBard";
// import BasicModal from '../chatIA/BasicModal';
import { m } from "framer-motion";
import {
  extractDataSisso,
  extractImagesFromPdf,
  extractionDataBase,
  fetchIAData,
  // fetchToPdf,
  MapeoPromptSisso,
  mergeJsons,
  promptDatosGenerales,
  validationStateFile,
} from "./serviceSisso";
// import ControlModal from "src/components/components/ControlModal";
import InvestigationView from "./InvestigationView";
import Upload from "components/UploadDocument/Upload";
import ControlModal from "components/controllers/ControlModal";
import toast from "react-hot-toast";
import { useBoolean } from "hooks/use-boolean";
// import pdfToText from "react-pdftotext";
// import VisualHtmlViewer from './VisualHtmlViewer';
import CustomizedSteppers from './ProgressBard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const validations = Yup.object().shape({});

export default function FormUploadFileSisso() {
  //   const { user } = useAuthContext();
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [dataProduct, setDataProduct] = useState();
  const [listMappingproduct, setListMappingproduct] = useState([]);
  const [countProgress, setCountProgress] = useState(0);
  const [pdfUrl, setPdfUrl] = useState();
  const [fileView, setFileView] = useState();
  const [mensaje, setMensaje] = useState(
    "Iniciando la extracción de la información"
  );
  const [dataInvestigation, setDataInvestigation] = useState([]);
  const [htmlContent, setHtmlContent] = useState(null);

  const [dataCurrent, setDataCurrent] = useState();
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [archivoAdjunto, setArchivoAdjunto] = useState(null);

  const confirm = useBoolean();
  const enable = useBoolean();
  const onsave = useBoolean();
  const saveState = useBoolean();
  const confirmModal = useBoolean();

  const methods = useForm({ resolver: yupResolver(validations) });

  const {
    formState: { isSubmitting },
  } = methods;

  const handleDropCargar = useCallback((files) => {
    setAcceptedFiles((prev) => {
      const newFiles = files.filter(
        (file) => !prev.some((acceptedFile) => acceptedFile.path === file.path)
      );

      if (newFiles.length < files.length) {
        toast.error("Algunos archivos ya estaban en la lista");
        // enqueueSnackbar("Algunos archivos ya estaban en la lista", {
        //   variant: "warning",
        //   anchorOrigin: { vertical: "top", horizontal: "right" },
        // });
      }
      saveState.onTrue();
      setCountProgress(1);

      return [...prev, ...newFiles];
    });
  }, []);

  const extractInformation = async (file) => {
    // const responseFile = await converToPDF(file);

    try {
      confirm.onTrue();

      // Obtienes el texto (lo puedes dividir ya sea por páginas o secciones)
      // const [database] = await Promise.all([
      //   extractionDataBase(file),
      //   // extractDataSisso(file), // <- ahora devuelve un array con bloques de texto
      // ]);

      await GetResponseIA(file)
      // console.log(dataBlocks);

      enable.onTrue();

      // let allResponses = [];

      // for (let i = 0; i < dataBlocks.length; i++) {
      //   console.log(dataBlocks);
      //   const response = await GetResponseIA(file, 0);
      //   if (response) {
      //     allResponses.push(response);
      //   }
      // }

      // // Aquí unes todos los JSON en uno solo
      // const merged = mergeJsons(allResponses);
      // console.log("FINAL JSON:", merged);
    } catch (error) {
      confirm.onFalse();
      toast.error("Error al extraer la información");
      //   enqueueSnackbar("Error al extraer la información", { variant: "error" });
    }
  };

  // const converToPDF = async (file) => {
  //   try {
  //     const response = await fetchToPdf(file);
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  useEffect(() => {
    if (listMappingproduct.length > 0) {
      const invalidFiles = validationStateFile(acceptedFiles);
      if (invalidFiles.length === 0) {
        saveState.onFalse();
        setCountProgress(2);
      }
    }

    if (acceptedFiles.length === 0) {
      setCountProgress(0);
    }
  }, [listMappingproduct, acceptedFiles]);

  const handleFileRemove = (file) => {
    if (!file?.path) return;

    setAcceptedFiles((prev) => prev.filter((f) => f.path !== file.path));
    setListMappingproduct((prev) =>
      prev.filter((item) => item.path !== file.path)
    );
  };

  // Peticion a la IA
  const GetResponseIA = async ( file) => {
    console.log("archivo ia",file)
  
    try {
      // const fileres = await sendFile(file);
      // console.log("respesta de IMAGENES",fileres);
      //File



      
      // const response = await fetchIAData(
      //   MapeoPromptSisso(extractedText, 0),
      //   confirm,
      //   file,
      //   acceptedFiles,
      //   setAcceptedFiles
      // );
      // console.log("respesta de IA", response);

      const database = extractionDataBase(file);
      console.log(database);

      const response = await extractImagesFromPdf(file, promptDatosGenerales);
      console.log("respesta de IMAGENES",response);

      // res.departamentoempresa=response.departamento
      // res.lugar_nacimiento=response.lugar_nacimiento
      // res.departamento_nacimiento=response.departamento_nacimiento

      response.id = database?.nombre;

      console.log(response);

      setDataInvestigation((prev) => [...prev, response]);

      setCountProgress(2);

      // setDataInvestigation(response)
      // if (response === false) {
      //   enqueueSnackbar('Este archivo no corresponde a una ficha tecnica FDS.', {
      //     variant: 'warning',
      //   });
      //    confirm.onFalse();
      //   return;
      // }

      confirm.onFalse();

      // let mappingData = { ...database, ...response };

      // if (!Array.isArray(response.cas) || response.cas.length === 0) {
      //   const result = await fetchIAData(MapeoPromptCas(mappingData.nombre));
      //   mappingData = { ...mappingData, cas: [result.cas] };
      // }

      // updateStateFile(file, acceptedFiles, setAcceptedFiles);

      // setDataProduct(mappingData);
    } catch (error) {
      confirm.onFalse();

      toast.error("No se pudo extraer la información. Intente nuevamente.");
      //   enqueueSnackbar(
      //     "No se pudo extraer la información. Intente nuevamente.",
      //     {
      //       variant: "warning",
      //     }
      //   );
      console.error("Error:", error);
    }
  };

  // useEffect(() => {
  //   if (!dataProduct) return;
  //   let active = true;

  //   (async () => {
  //     setMensaje('Haciendo scrapping para extraer resultado de CAS');
  //     try {
  //       const arraycas = await webScrapping(dataProduct.cas);
  //       if (!active) return;

  //       setMensaje('Mapeando datos extraídos');
  //       const dataMaping = await mappingData(dataProduct, arraycas, user);
  //       setListMappingproduct((prev) => [...prev, dataMaping]);
  //       confirm.onFalse();
  //     } catch {
  //       setMensaje('Error al hacer scraping');
  //       confirm.onFalse();
  //     }
  //   })();

  //   return () => {
  //     active = false;
  //   };
  // }, [dataProduct, user]);

  const onSubmit = async () => {
    // try {
    //   onsave.onTrue();
    //   await onSaveMaster(listMappingproduct, acceptedFiles, user);
    //   setAcceptedFiles([]);
    //   setListMappingproduct([]);
    //   enqueueSnackbar("Archivos guardados correctamente ✅", {
    //     variant: "success",
    //   });
    // } catch (error) {
    //   console.error("Error en onSubmit:", error);
    // } finally {
    //   onsave.onFalse();
    // }
  };

  const handleView = async (file) => {
    console.log(file);
    console.log(dataInvestigation);
    if (file) {
      const database = extractionDataBase(file);
      const dataFile = dataInvestigation.find(
        (item) => item.id === database.nombre
      );
      console.log(dataFile);
      if (dataFile) {
        setDataCurrent(dataFile);
        // setFileView(dataFile);
        confirmModal.onTrue();
      }
    }
  };

  const handleDrop = useCallback(
    (event) => {
      const files = Array.isArray(event) ? event : event.target?.files || [];
      console.log("Archivos recibidos:", files);

      setAcceptedFiles((prev) => {
        const newFiles = files.filter(
          (file) =>
            !prev.some(
              (acceptedFile) =>
                acceptedFile.name.toLowerCase() === file.name.toLowerCase()
            )
        );

        if (newFiles.length < files.length) {
          toast.error("Algunos archivos ya estaban en la lista");
        }

        saveState.onTrue();
        setCountProgress(1);

        return [...prev, ...newFiles];
      });
    },
    [archivoAdjunto]
  );

  useEffect(() => {
    console.log("Accepted files:", acceptedFiles.length);
  }, [acceptedFiles]);

  return (
    <>
      {/* Modales */}
      {/* <ModalBasic
        confirmModal={confirm}
        message={mensaje}
        message2="Por favor espere..."
        animation={animationloader}
      /> */}

      <ControlModal
        open={confirmModal.value}
        onclose={confirmModal.onFalse}
        children={<InvestigationView data={dataCurrent} />}
        maxWidth="lg"
        // actions={
        //   <Button
        //     variant="contained"
        //     color="error"
        //     onClick={confirmModal.onFalse}
        //   >
        //     Cerrar
        //   </Button>
        // }
      />

      {/* ------------------------ */}

      <Grid
        container
        spacing={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Grid item xs={12}>
          <CustomizedSteppers countProgress={countProgress} />
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{
            paddingTop: 0,
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            mt: 4,
          }}
        >
          <Item
            sx={{
              height: "350px",
              width: "90%",
              alignItems: "center",
              marginY: "auto",
              boxShadow: 3,
            }}
          >
            <Upload multiple files={archivoAdjunto} onDrop={handleDrop} />
          </Item>
        </Grid>

        {/* {acceptedFiles?.length > 0 && (
          <Typography
            sx={{
              paddingLeft: 2,
              whiteSpace: "pre-wrap",
              width: "35%",
            }}
            variant="body2"
            color="#546e7a"
          >
            {`  No. Items ${acceptedFiles.length}  `}
          </Typography>
        )} */}

        {acceptedFiles?.length > 0 && (
          <Grid
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 4,
              flexGrow: 1,
              display: "flex",

              padding: 2,
              justifyContent: "start",
            }}
          >
            {/* <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          > */}
            <Item sx={{ paddingLeft: 2 }}>
              <Box
                sx={{
                  alignContent: "space-between",
                  display: "flex",
                  width: "100%",
                  mt: 2,
                  paddingX: 2,
                }}
              >
                <Typography
                  sx={{
                    paddingLeft: 0,
                    whiteSpace: "pre-wrap",
                    textAlign: "left",
                    width: "65%",
                  }}
                  variant="body1"
                  color="#546e7a"
                >
                  Lista de archivos
                </Typography>

                <Typography
                  sx={{
                    paddingLeft: 2,
                    whiteSpace: "pre-wrap",
                    width: "35%",
                  }}
                  variant="body2"
                  color="#546e7a"
                >
                  {`  No. Items ${acceptedFiles.length}  `}
                </Typography>
              </Box>

              <Box sx={{ overflowY: "auto", height: "auto", maxHeight: 240 }}>
                <ItemUpload
                  acceptedFiles={acceptedFiles}
                  handleViewPDF={handleView}
                  handleFileRemove={handleFileRemove}
                  handleFileSave={extractInformation}
                  filecolor={""}
                  enable={enable.value}
                  enableview={false}
                  estado={false}
                />
              </Box>

              <Stack
                direction="row"
                spacing={2}
                width="100%"
                sx={{
                  justifyContent: {
                    xs: "center",
                    sm: "center",
                    md: "start",
                    lg: "start",
                  },
                  paddingRight: {
                    xs: 5,
                    sm: 0,
                    md: 5,
                    lg: 5,
                  },
                  paddingLeft: {
                    xs: 0,
                    sm: 0,
                    md: 0,
                    lg: 0,
                  },
                }}
              >
                <Button
                  onClick={onSubmit}
                  disabled={saveState.value}
                  sx={{
                    width: {
                      xs: "100%",
                      sm: 300,
                      md: 150,
                      lg: 150,
                    },
                    height: 40,
                    borderRadius: 4,
                    background: "#d32f2f",
                    marginTop: 2,
                    "&:hover": {
                      background: "#b71c1c",
                    },
                  }}
                  size="large"
                  variant="contained"
                >
                  Guardar
                  {onsave.value && (
                    <Box sx={{ paddingLeft: 1, display: "flex" }}>
                      <CircularProgress
                        color="inherit"
                        size={25}
                        thickness={5}
                      />
                    </Box>
                  )}
                </Button>
              </Stack>
            </Item>
            {/* </m.div> */}
          </Grid>
        )}
      </Grid>
    </>
  );
}
