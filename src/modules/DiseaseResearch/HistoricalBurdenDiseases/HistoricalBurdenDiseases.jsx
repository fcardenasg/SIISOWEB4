import {
  Button,
  CircularProgress,
  Stack,
  Typography,
  Paper,
  Box,
  Modal,
  Tooltip,
  IconButton,
  Chip,
  Divider,
  LinearProgress,
  Dialog,
  DialogContent,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import Lottie from "lottie-react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useCallback, useEffect, useState } from "react";
import ItemUpload from "./ItemUpload";

import { motion, AnimatePresence } from "framer-motion";
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

/* ─────────── Styled Components ─────────── */

const GlassCard = styled(Paper)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, rgba(30,41,59,0.85) 0%, rgba(15,23,42,0.92) 100%)"
      : "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: 20,
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 8px 32px rgba(0,0,0,0.3)"
      : "0 8px 32px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
  overflow: "hidden",
  position: "relative",
  transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
  "&:hover": {
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 12px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(227,25,55,0.2)"
        : "0 12px 48px rgba(0,0,0,0.1), 0 0 0 1px rgba(227,25,55,0.15)",
    transform: "translateY(-2px)",
  },
}));

const GradientAccent = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: 3,
  background: "linear-gradient(90deg, #E31937 0%, #F44B62 35%, #B8132B 65%, #8C0E20 100%)",
  borderRadius: "20px 20px 0 0",
}));

const GlowingOrb = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: 300,
  height: 300,
  filter: "blur(80px)",
  borderRadius: "50%",
  zIndex: 0,
  pointerEvents: "none",
}));

const FileListHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2, 2.5),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.06)}`,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 14,
  padding: "10px 28px",
  fontWeight: 600,
  fontSize: "0.875rem",
  textTransform: "none",
  letterSpacing: "0.01em",
  transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
  boxShadow: "none",
  "&:hover": {
    boxShadow: "0 4px 16px rgba(227,25,55,0.25)",
    transform: "translateY(-1px)",
  },
}));

const validations = Yup.object().shape({});

/* ─────────── Motion Variants ─────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 28 },
  },
};

/* Smooth spring config used for all layout transitions */
const smoothLayoutTransition = {
  layout: { type: "spring", stiffness: 200, damping: 30, mass: 0.8 },
};

const fileListVariants = {
  hidden: { opacity: 0, scale: 0.92, x: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 26,
      mass: 0.9,
      delay: 0.08,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    x: 60,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.7,
    },
  },
};

export default function FormUploadFileSisso() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
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
    console.log("file", file);
    confirm.onTrue();
    let base64String = null;
    let pdfBlob = null

    try {
      const responseSfdt = await ConvertirWordtoHtml(file);
      const { datosEncabezado, fileName, informe } = responseSfdt.data;
      console.log("info", responseSfdt.data);

      if (datosEncabezado.identificacion) {
        const identificacion = datosEncabezado.identificacion;
        const soloNumeros = identificacion.replace(/\D/g, "");
        datosEncabezado.identificacion = soloNumeros;
      }

      setMarkdown(informe);
      const responsePDF = await ConvertirWordtoPdf(file);
      console.log("responsePDF", responsePDF);
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
      toast.error(
        "Ha ocurrido un error al extraer la informaion por favor vuelva a intentarlo",err
      );
      confirm.onFalse();
      saveState.onTrue();
    }
  };
  useEffect(() => {
    console.log("data", data);
  }, [data]);


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
    } else {
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
    if (file) {
      const database = extractionDataBase(file);

      setDatabase(database);
      setFileView(file);

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
    setMensaje("Generando vista previa del documento, por favor espere...");
    confirm.onTrue();
    const filterData = data.find((item) => item.filename === file.path);

    if (filterData && filterData.pdfBlob) {
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

    const link = document.createElement('a');
    link.href = base64String;
    link.download = filterData.nombres + ".pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  };

  /* ────── Helpers for processed count ────── */
  const processedCount = acceptedFiles.filter((f) => f.state).length;
  const totalFiles = acceptedFiles.length;

  return (
    <>
      {/* Modales */}
      <ModalBasic
        confirmModal={confirm}
        message={mensaje}
        message2="Por favor espere..."
      />

      <Dialog
        disableScrollLock={true}
        open={confirmModal.value}
        onClose={confirmModal.onFalse}
        fullWidth
        maxWidth="lg"
        TransitionComponent={motion.div}
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
            border: (t) => `1px solid ${alpha(t.palette.divider, 0.08)}`,
          },
        }}
        slotProps={{
          backdrop: {
            sx: { backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.35)' },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2,
            background: 'linear-gradient(135deg, #E31937 0%, #B8132B 100%)',
            color: '#fff',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255,255,255,0.18)',
              }}
            >
              <DescriptionOutlinedIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                {fileView?.name || fileView?.path || "Informe Médico"}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)' }}>
                Resultado de la extracción con IA
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={confirmModal.onFalse}
            sx={{
              color: '#fff',
              bgcolor: 'rgba(255,255,255,0.12)',
              borderRadius: '10px',
              width: 36,
              height: 36,
              transition: 'all 0.2s',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        {/* Content */}
        <DialogContent
          sx={{
            px: { xs: 2, md: 4 },
            py: 3,
            maxHeight: '70vh',
            '&::-webkit-scrollbar': { width: 6 },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: 3,
              bgcolor: (t) => alpha(t.palette.text.primary, 0.12),
              '&:hover': { bgcolor: (t) => alpha(t.palette.text.primary, 0.2) },
            },
            '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
          }}
        >
          {markdown && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              children={markdown}
              className="informe-medico"
              components={{
                br: () => <br />,
              }}
            />
          )}
        </DialogContent>
      </Dialog>

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
            title={fileView ? fileView.name || fileView.path : "Documento"}
            subtitle="Investigación de enfermedad laboral"
            open={confirmModalDocx.value}
            onClose={() => {
              setMensaje("");
              setFileView(null);
              setPdfUrl(null);
              confirmModalDocx.onFalse();
            }}
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

      {/* ══════════════════════════════════════════════ */}
      {/* MAIN CONTENT                                  */}
      {/* ══════════════════════════════════════════════ */}

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <GlowingOrb sx={{ top: "-10%", left: "-5%", background: "rgba(227, 25, 55, 0.15)" }} />
        <GlowingOrb sx={{ bottom: "-10%", right: "-5%", background: "rgba(184, 19, 43, 0.12)" }} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ position: "relative", zIndex: 2 }}
        >
          {/* Header Section */}
          <Box sx={{ mb: 4, textAlign: "left" }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.75rem", md: "2.25rem" },
                  background: "linear-gradient(135deg, #B8132B 0%, #E31937 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.02em",
                  mb: 1,
                }}
              >
                Carga de Historial Médico
              </Typography>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 600 }}>
                Sube los documentos clínicos en formato .docx para extraer automáticamente la información mediante inteligencia artificial.
              </Typography>
            </motion.div>
          </Box>

          {/* ═══════════ Flex Layout with layout animations ═══════════ */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "stretch",
              flexDirection: { xs: "column", lg: "row" },
            }}
          >
            {/* ═══════════ LEFT: Upload Zone ═══════════ */}
            <motion.div
              layout
              transition={smoothLayoutTransition}
              style={{
                flex: acceptedFiles.length > 0 ? "1 1 50%" : "1 1 100%",
                minWidth: 0,
              }}
            >
              <motion.div variants={itemVariants} style={{ height: "100%" }}>
                <GlassCard
                  elevation={0}
                  sx={{
                    height: "100%",
                    minHeight: 380,
                    display: "flex",
                    flexDirection: "column",
                    p: 0,
                  }}
                >
                  <GradientAccent />

                  {/* Card Header */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      px: 3,
                      pt: 3,
                      pb: 1.5,
                    }}
                  >
                    <motion.div
                      layout
                      transition={smoothLayoutTransition}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "linear-gradient(135deg, #E31937, #F44B62)",
                          color: "#fff",
                          flexShrink: 0,
                        }}
                      >
                        <CloudUploadOutlinedIcon fontSize="small" />
                      </Box>
                    </motion.div>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, lineHeight: 1.3 }}
                      >
                        Cargar Documentos
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        Arrastra o selecciona archivos .docx
                      </Typography>
                    </Box>
                  </Box>

                  {/* Upload Area */}
                  <Box
                    sx={{
                      flex: 1,
                      px: 2.5,
                      pb: 2.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <UploadMultiselect
                      multiple
                      files={archivoAdjunto}
                      onDrop={handleDrop}
                    />
                  </Box>
                </GlassCard>
              </motion.div>
            </motion.div>

            {/* ═══════════ RIGHT: File List ═══════════ */}
            <AnimatePresence>
              {acceptedFiles?.length > 0 && (
                <motion.div
                  key="file-list-panel"
                  layout
                  variants={fileListVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={smoothLayoutTransition}
                  style={{
                    flex: "1 1 50%",
                    minWidth: 0,
                    overflow: "hidden",
                  }}
                >
                  <GlassCard
                    elevation={0}
                    sx={{
                      height: "100%",
                      minHeight: 380,
                      display: "flex",
                      flexDirection: "column",
                      p: 0,
                    }}
                  >
                    <GradientAccent
                      sx={{
                        background:
                          "linear-gradient(90deg, #B8132B 0%, #E31937 50%, #F44B62 100%)",
                      }}
                    />

                    {/* File List Header */}
                    <FileListHeader>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                              "linear-gradient(135deg, #B8132B, #E31937)",
                            color: "#fff",
                            flexShrink: 0,
                          }}
                        >
                          <FolderOpenIcon fontSize="small" />
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 700, lineHeight: 1.3 }}
                          >
                            Archivos Cargados
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            Extrae y revisa la información
                          </Typography>
                        </Box>
                      </Box>

                      <motion.div
                        key={totalFiles}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <Chip
                          label={`${processedCount} / ${totalFiles}`}
                          size="small"
                          icon={<DescriptionOutlinedIcon sx={{ fontSize: 16 }} />}
                          sx={{
                            fontWeight: 600,
                            bgcolor: alpha(
                              processedCount === totalFiles
                                ? theme.palette.success.main
                                : theme.palette.info.main,
                              0.1
                            ),
                            color:
                              processedCount === totalFiles
                                ? "success.main"
                                : "info.main",
                            border: `1px solid ${alpha(
                              processedCount === totalFiles
                                ? theme.palette.success.main
                                : theme.palette.info.main,
                              0.2
                            )}`,
                            "& .MuiChip-icon": {
                              color: "inherit",
                            },
                          }}
                        />
                      </motion.div>
                    </FileListHeader>

                    {/* Progress indicator */}
                    {totalFiles > 0 && (
                      <Box sx={{ px: 2.5, pb: 0.5 }}>
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          style={{ originX: 0 }}
                        >
                          <LinearProgress
                            variant="determinate"
                            value={
                              totalFiles > 0
                                ? (processedCount / totalFiles) * 100
                                : 0
                            }
                            sx={{
                              height: 4,
                              borderRadius: 4,
                              bgcolor: alpha(theme.palette.primary.main, 0.08),
                              "& .MuiLinearProgress-bar": {
                                borderRadius: 4,
                                background:
                                  processedCount === totalFiles
                                    ? "linear-gradient(90deg, #10b981, #06b6d4)"
                                    : "linear-gradient(90deg, #E31937, #F44B62)",
                                transition:
                                  "transform 0.6s cubic-bezier(.4,0,.2,1)",
                              },
                            }}
                          />
                        </motion.div>
                      </Box>
                    )}

                    {/* File Items */}
                    <Box
                      sx={{
                        flex: 1,
                        overflowY: "auto",
                        px: 2,
                        py: 1,
                        maxHeight: 280,
                        "&::-webkit-scrollbar": {
                          width: 6,
                        },
                        "&::-webkit-scrollbar-thumb": {
                          borderRadius: 3,
                          bgcolor: alpha(theme.palette.text.primary, 0.12),
                          "&:hover": {
                            bgcolor: alpha(theme.palette.text.primary, 0.2),
                          },
                        },
                        "&::-webkit-scrollbar-track": {
                          bgcolor: "transparent",
                        },
                      }}
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
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          {/* ═══════════ Bottom Action Bar ═══════════ */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                mt: 3,
                mb: 2,
                display: "flex",
                justifyContent: "flex-end",
                gap: 1.5,
              }}
            >
              <AnimateButton>
                <ActionButton
                  variant="outlined"
                  onClick={() => navigate("/ListHistoricalBurdenDiseases")}
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    borderColor: '#E31937',
                    color: "#E31937",
                    "&:hover": {
                      borderColor: alpha(theme.palette.text.primary, 0.3),
                      bgcolor: '#E31937',
                      color: 'white',
                      boxShadow: "none",
                      transform: "none",
                    },
                  }}
                >
                  {TitleButton.Cancelar}
                </ActionButton>
              </AnimateButton>

              <AnimateButton>
                <ActionButton
                  disabled={saveState.value}
                  variant="contained"
                  onClick={onSubmit}
                  startIcon={
                    onsave.value ? (
                      <CircularProgress color="inherit" size={18} thickness={5} />
                    ) : (
                      <SaveOutlinedIcon />
                    )
                  }
                  sx={{
                    background: saveState.value
                      ? undefined
                      : "linear-gradient(135deg, #E31937 0%, #B8132B 100%)",
                    color: "#fff",
                    px: 4,
                    "&:hover": {
                      background: "linear-gradient(135deg, #B8132B 0%, #8C0E20 100%)",
                    },
                    "&.Mui-disabled": {
                      background: alpha(theme.palette.action.disabled, 0.12),
                      color: alpha(theme.palette.text.primary, 0.3),
                    },
                  }}
                >
                  {TitleButton.Guardar}
                </ActionButton>
              </AnimateButton>
            </Box>
          </motion.div>
        </motion.div>
      </Box>
    </>
  );
}
