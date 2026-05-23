import {
  Box,
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
  Chip,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BlurLinearIcon from "@mui/icons-material/BlurLinear";
import PreviewIcon from "@mui/icons-material/Preview";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────── Styled Components ─────────── */

const FileCard = styled(Card)(({ theme, processed }) => ({
  width: "100%",
  borderRadius: 14,
  border: `1px solid ${alpha(
    processed ? theme.palette.success.main : theme.palette.divider,
    processed ? 0.2 : 0.08
  )}`,
  background: processed
    ? `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.04)} 0%, ${alpha(
        theme.palette.success.main,
        0.01
      )} 100%)`
    : theme.palette.mode === "dark"
    ? alpha(theme.palette.background.paper, 0.5)
    : "#fff",
  boxShadow: "none",
  transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
  overflow: "hidden",
  position: "relative",
  "&:hover": {
    borderColor: alpha(
      processed ? theme.palette.success.main : theme.palette.primary.main,
      0.3
    ),
    boxShadow: `0 4px 20px ${alpha(
      processed ? theme.palette.success.main : theme.palette.primary.main,
      0.08
    )}`,
    transform: "translateY(-1px)",
  },
}));

const ActionIconButton = styled(IconButton)(({ theme, colortype }) => {
  const colorMap = {
    danger: {
      bg: alpha(theme.palette.error.main, 0.08),
      bgHover: alpha(theme.palette.error.main, 0.15),
      color: theme.palette.error.main,
    },
    success: {
      bg: alpha(theme.palette.success.main, 0.08),
      bgHover: alpha(theme.palette.success.main, 0.15),
      color: theme.palette.success.main,
    },
    info: {
      bg: alpha(theme.palette.info.main, 0.08),
      bgHover: alpha(theme.palette.info.main, 0.15),
      color: theme.palette.info.main,
    },
    primary: {
      bg: alpha(theme.palette.primary.main, 0.08),
      bgHover: alpha(theme.palette.primary.main, 0.15),
      color: theme.palette.primary.main,
    },
  };
  const c = colorMap[colortype] || colorMap.primary;
  return {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: c.bg,
    color: c.color,
    transition: "all 0.25s cubic-bezier(.4,0,.2,1)",
    "&:hover": {
      backgroundColor: c.bgHover,
      transform: "scale(1.08)",
    },
  };
});

const ExtractButton = styled(Button)(({ theme }) => ({
  borderRadius: 10,
  padding: "6px 16px",
  fontWeight: 600,
  fontSize: "0.78rem",
  textTransform: "none",
  background: "linear-gradient(135deg, #E31937 0%, #B8132B 100%)",
  color: "#fff",
  boxShadow: "0 2px 10px rgba(227,25,55,0.25)",
  transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
  "&:hover": {
    background: "linear-gradient(135deg, #B8132B 0%, #8C0E20 100%)",
    boxShadow: "0 4px 16px rgba(227,25,55,0.35)",
    transform: "translateY(-1px)",
  },
}));

/* ─────────── Motion Variants ─────────── */
const listItemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      type: "spring",
      stiffness: 340,
      damping: 26,
    },
  }),
  exit: {
    opacity: 0,
    x: -30,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export default function ItemUpload({
  acceptedFiles,
  handleFileRemove,
  handleViewPDF,
  handleFileSave,
  handleViewDocx,
  isExtracting,
  extractionComplete,
  filecolor,
  enable,
  enableview,
  estado,
}) {
  const theme = useTheme();

const ViewExtraer = ({ file }) => {
  console.log("Archivo actual en esta fila:", file);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.75,
      }}
    >
      <ExtractButton
        size="small"
        variant="contained"
        startIcon={<AutoFixHighIcon sx={{ fontSize: 16 }} />}
        onClick={() => {
          // 1. Validamos que el archivo de la prop exista
          if (!file) {
            toast.error("No se encontró el archivo para extraer.");
            return;
          }

          // 2. Si ya terminó (Nota: estas variables deben venir de tu estado o props)
          if (extractionComplete) {
            toast.success("Información ya extraída");
            return;
          }

          // 3. Si ya está en progreso
          if (isExtracting) {
            toast.loading("Extracción en curso... Se completará en breve.");
            return;
          }

          // 4. PASAMOS EL ARCHIVO DE LA PROP DIRECTAMENTE
          handleFileSave(file); 
        }}
      >
        Extraer
      </ExtractButton>

      <Tooltip title="Eliminar archivo" arrow>
        <ActionIconButton
          colortype="danger"
          size="small"
          onClick={() => handleFileRemove(file)} // Aquí ya lo usabas bien
        >
          <DeleteForeverIcon sx={{ fontSize: 18 }} />
        </ActionIconButton>
      </Tooltip>
    </Box>
  );
};

  const ProcessedActions = ({ file }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
      >
        <Chip
          icon={<CheckCircleOutlineIcon sx={{ fontSize: 15 }} />}
          label="Listo"
          size="small"
          sx={{
            fontWeight: 600,
            fontSize: "0.72rem",
            bgcolor: alpha(theme.palette.success.main, 0.1),
            color: "success.main",
            border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
            "& .MuiChip-icon": { color: "inherit" },
            height: 26,
          }}
        />
      </motion.div>

      <Tooltip title="Ver informe" arrow>
        <ActionIconButton
          colortype="info"
          size="small"
          onClick={() => handleViewPDF(file)}
        >
          <ImageSearchIcon sx={{ fontSize: 17 }} />
        </ActionIconButton>
      </Tooltip>

      <Tooltip title="Vista previa PDF" arrow>
        <ActionIconButton
          colortype="primary"
          size="small"
          onClick={() => handleViewDocx(file)}
        >
          <PictureAsPdfOutlinedIcon sx={{ fontSize: 17 }} />
        </ActionIconButton>
      </Tooltip>

      <Tooltip title="Eliminar" arrow>
        <ActionIconButton
          colortype="danger"
          size="small"
          onClick={() => handleFileRemove(file)}
        >
          <DeleteForeverIcon sx={{ fontSize: 17 }} />
        </ActionIconButton>
      </Tooltip>
    </Box>
  );

  /* ──── Filename display helper ──── */
  const getShortName = (path) => {
    if (!path) return "Archivo";
    const parts = path.replace(/\\/g, "/").split("/");
    return parts[parts.length - 1];
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25, py: 0.5 }}>
      <AnimatePresence>
        {acceptedFiles.map((file, index) => {
          const isProcessed = !!file.state;
          return (
            <motion.div
              key={file.path || index}
              custom={index}
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <FileCard variant="outlined" processed={isProcessed ? 1 : 0}>
                {/* Subtle left accent */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    borderRadius: "14px 0 0 14px",
                    background: isProcessed
                      ? "linear-gradient(180deg, #10b981, #06b6d4)"
                      : "linear-gradient(180deg, #E31937, #B8132B)",
                    opacity: 0.8,
                  }}
                />

                <Box
                  sx={{
                    px: 2,
                    py: 1.25,
                    pl: 2.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  {/* File Info */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.25,
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isProcessed
                          ? alpha(theme.palette.success.main, 0.1)
                          : alpha(theme.palette.primary.main, 0.08),
                        color: isProcessed ? "success.main" : "primary.main",
                        flexShrink: 0,
                        transition: "all 0.3s ease",
                      }}
                    >
                      <InsertDriveFileOutlinedIcon sx={{ fontSize: 20 }} />
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          lineHeight: 1.3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: { xs: 140, sm: 200, md: 250 },
                          color: "text.primary",
                        }}
                        title={file.path}
                      >
                        {getShortName(file.path)}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.disabled", lineHeight: 1.3 }}
                      >
                        {isProcessed ? "Información extraída" : "Pendiente de extracción"}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Actions */}
                  {isProcessed ? (
                    <ProcessedActions file={file} />
                  ) : (
                    <ViewExtraer file={file} />
                  )}
                </Box>
              </FileCard>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Box>
  );
}
