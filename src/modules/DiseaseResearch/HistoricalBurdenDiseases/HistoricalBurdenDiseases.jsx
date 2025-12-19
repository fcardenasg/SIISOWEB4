import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  Paper,
  Box,
  Modal,
  Tooltip,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import Lottie from "lottie-react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useCallback, useEffect, useState } from "react";
import ItemUpload from "./ItemUpload";

import { motion } from "framer-motion";
import {
  extractImagesFromPdf,
  extractionDataBase,
  extractWordFromText,
  fileToBase64,
  onSaveMaster,
  promptDatosGenerales,
  propmt,
  propmtprueba,
  updateStateFile,
  validationStateFile,
  wordOpenIa,
  ConvertirDocxASfdt,
  ConvertirWordtoHtml,
  MapeoPromptSisso,
  fetchIA,
  ConvertirWordtoPdf,
} from "./serviceSisso";

import InvestigationView from "./InvestigationView";
import Upload from "components/UploadDocument/Upload";
import ControlModal from "components/controllers/ControlModal";
import useAuth from "hooks/useAuth";
import toast from "react-hot-toast";
import { useBoolean } from "hooks/use-boolean";

import CustomizedSteppers from "./ProgressBard";
import VisualizatorFile from "./VisualizatorFile";
import ControlModalView from "components/controllers/ControlModalView";
import AnimateButton from "ui-component/extended/AnimateButton";

import ViewHtml from "./ViewHtml";
import ModalBasic from "./ModalBasic";
import { TitleButton } from "components/helpers/Enums";
import { useNavigate } from "react-router-dom";
import UploadMultiselect from "components/UploadDocument/UploadMultiselect";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./markdown.css";
import { convertToFileBase64 } from "components/helpers/ConvertToBytes";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const validations = Yup.object().shape({});

export default function FormUploadFileSisso() {
  const { user } = useAuth();
  const navigate = useNavigate();
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
  const [archivoAdjunto, setArchivoAdjunto] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [database, setDatabase] = useState(null);
  const [html, setHtml] = useState();
  const [markdown, setMarkdown] = useState();
  const [data, setData] = useState([]);

  const confirm = useBoolean();
  const enable = useBoolean();
  const onsave = useBoolean();
  const saveState = useBoolean(true);
  const confirmModal = useBoolean();
  const confirmModalDocx = useBoolean();
  const confirmExport = useBoolean();
  const confirmModalHtml = useBoolean();

  const methods = useForm({ resolver: yupResolver(validations) });

  const {
    formState: { isSubmitting },
  } = methods;

  const extractInformation = async (file) => {
    confirm.onTrue();
    let base64String = null;
      let pdfBlob=null

    try {
      const responseSfdt = await ConvertirWordtoHtml(file);
      const { datosEncabezado, fileName, informe } = responseSfdt.data;

      if (datosEncabezado.identificacion) {
        const identificacion = datosEncabezado.identificacion;
        const soloNumeros = identificacion.replace(/\D/g, "");
        datosEncabezado.identificacion = soloNumeros;
      }

      setMarkdown(informe);
      const responsePDF = await ConvertirWordtoPdf(file);
      if (responsePDF.data) {
        base64String = await convertToFileBase64(responsePDF.data);
          pdfBlob = responsePDF.data;
      }

      setData((prev) => [
        ...prev,
        {
          ...datosEncabezado,
          filename: file.path,
          informe: informe,
          bat64: base64String,
          pdfBlob: pdfBlob,
        },
      ]);

      updateStateFile(file, acceptedFiles, setAcceptedFiles);
      setCountProgress(2);
      confirm.onFalse();
      saveState.onFalse();
    } catch (err) {
      console.log(err);
      toast.error(
        "Ha ocurrido un error al extraer la informaion por favor vuelva a intentarlo"
      );
      confirm.onFalse();
      saveState.onTrue();
    }
  };


  useEffect(() => {
    if (html) {
      confirmModalHtml.onTrue();
    }
  }, [html]);

  useEffect(() => {
    if (data.length > 0) {
      const invalidFiles = validationStateFile(acceptedFiles);
      if (invalidFiles.length === 0) {
        saveState.onFalse();
        setCountProgress(2);
      } else {
        saveState.onTrue();
      }
    }else{
      saveState.onTrue();
    }

    if (acceptedFiles.length === 0) {
      setCountProgress(0);
    }
  }, [data, acceptedFiles]);

  const handleFileRemove = (file) => {
    if (!file?.path) return;

    setAcceptedFiles((prev) => prev.filter((f) => f.path !== file.path));
    setData((prev) =>
      prev.filter((item) => item.filename !== file.path)
    );
  };

  const onSubmit = async () => {

    try {
      onsave.onTrue();
      await onSaveMaster(data, acceptedFiles);
      setAcceptedFiles([]);
      setListMappingproduct([]);
      saveState.onTrue();
    } catch (error) {
      console.error("Error en onSubmit:", error);
    } finally {
      onsave.onFalse();
    }
  };

  const handleView = async (file) => {
    console.log("dataInvestigation", dataInvestigation);
    if (file) {
      const database = extractionDataBase(file);

      setDatabase(database);

      setDataCurrent(dataInvestigation);
      confirmModal.onTrue();
    }
  };

  const handleDrop = useCallback(
    (event) => {
      const files = Array.isArray(event) ? event : event.target?.files || [];

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
 
        setCountProgress(1);

        return [...prev, ...newFiles];
      });
    },
    [archivoAdjunto]
  );

 
  const handleViewDocx = async (file) => {
    console.log("file", file);
    setMensaje("Generando vista previa del documento, por favor espere...");
    confirm.onTrue();
    const filterData = data.find((item) => item.filename === file.path);
    
    if(filterData && filterData.pdfBlob){
      setFileView(file);
      const urlpdf = URL.createObjectURL(filterData.pdfBlob);
      setPdfUrl(urlpdf);
      confirmModalDocx.onTrue();     
    }
    confirm.onFalse();
  };

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const handleExport = async () => { 
    const filterData = data.find((item) => item.filename === fileView.path);
    const base64String = await convertToFileBase64(filterData.pdfBlob);
    console.log("filterData", filterData);
  
    const link = document.createElement('a');
    link.href = base64String;
    link.download = filterData.nombres+".pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
 
  };

  return (
    <>
      {/* Modales */}
      <ModalBasic
        confirmModal={confirm}
        message={mensaje}
        message2="Por favor espere..."
      />

      <ControlModal
        open={confirmModal.value}
        onClose={confirmModal.onFalse}
        children={
          // <InvestigationView data={dataCurrent}/>
          markdown && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              children={markdown}
              className="informe-medico"
              components={{
                br: () => <br />,
              }}
            />
          )
        }
        maxWidth="lg"
      />

      <ControlModal
        open={confirmModalHtml.value}
        onClose={confirmModalHtml.onFalse}
        children={<ViewHtml html={html} />}
        maxWidth="md"
      />

      {confirmModalDocx.value && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: confirmModalDocx.value ? 1 : 0,
            y: confirmModalDocx.value ? 0 : -10,
          }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <ControlModalView
            title="Investigación de enfermedad laboral"
            open={confirmModalDocx.value}
            onClose={confirmModalDocx.onFalse}
            handleExportar={handleExport}
            children={
              pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  title="Vista previa del PDF"
                  width="100%"
                  height="600px"
                  style={{ border: "none" }}
                />
              ) : (
                <div>Cargando PDF...</div>
              )
            }
            maxWidth="lg"
          />
        </motion.div>
      )}

      {/* ------------------------ */}

      <Grid
        container
        spacing={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={12}>
            <CustomizedSteppers countProgress={countProgress} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{
                paddingTop: 0,
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                mt: 2,
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
                <UploadMultiselect
                  multiple
                  files={archivoAdjunto}
                  onDrop={handleDrop}
                />
              </Item>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} lg={6}>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {acceptedFiles?.length > 0 && (
              <Grid
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mt: 2,
                  flexGrow: 1,
                  display: "flex",

                  padding: 2,
                  justifyContent: "start",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
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

                    <Box
                      sx={{ overflowY: "auto", height: "auto", maxHeight: 240 }}
                    >
                      <ItemUpload
                        acceptedFiles={acceptedFiles}
                        handleViewPDF={handleView}
                        handleFileRemove={handleFileRemove}
                        handleFileSave={extractInformation}
                        handleViewDocx={handleViewDocx}
                        filecolor={""}
                        enable={enable.value}
                        enableview={false}
                        estado={false}
                      />
                    </Box>

                    {/* <Stack
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
                    </Stack> */}
                  </Item>
                </motion.div>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            mb: 2,
            mt: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Grid container spacing={2} sx={{ pl: 2 }}>
            <Grid item xs={6} md={4} lg={2}>
              <AnimateButton>
                <Button
                  disabled={saveState.value}
                  variant="contained"
                  onClick={onSubmit}
                  fullWidth
                >
                  {TitleButton.Guardar}
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
              </AnimateButton>
            </Grid>

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
      </Grid>
    </>
  );
}
