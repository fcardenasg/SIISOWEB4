import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Grid,
  Button,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Nota: Asegúrate de ajustar las rutas de importación de tus componentes personalizados
import ChatIA from "../../ChatIA";
// import ValidateActionSkeleton from "components/ValidateAction/ValidateActionSkeleton";
// import { FormProvider } from "react-hook-form"; // o tu librería de formularios
// import MessageUpdate from "components/alert/MessageUpdate";
// import MessageError from "components/alert/MessageError";
import SubCard from "ui-component/cards/SubCard";
import AnimateButton from "ui-component/extended/AnimateButton";
import Cargando from "components/loading/Cargando";
import { useBoolean } from "hooks/use-boolean";
import { TitleButton } from "components/helpers/Enums";
import { convertBase64ToBlobUrl } from "../service";

export default function InvestigacionIaModal({
  // Estados y booleanos
  confirm,
  name,
  informe,
  setInforme,
}) {

  const [file, setFile] = useState();

  useEffect(() => {
    let pdfUrl = null;

    if (informe?.bat64) {
      pdfUrl = convertBase64ToBlobUrl(informe.bat64, "application/pdf");
      if (pdfUrl) {
        setFile(pdfUrl);
      }
    }

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [informe?.bat64]);

  useEffect(() => {
    if (file) {
      confirm.onTrue();
    }
  }, [file]);

  return (
    <>
    
      <Dialog
        open={confirm.value}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, py: 2,pl:5 }}>
          <Typography variant="h4">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Investigación de enfermedad laboral
          </Typography>

          <IconButton
            onClick={() => {
              confirm.onFalse();
              setInforme(null);
              setFile(null);
            }}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mb: 2,
              }}
            >
              <Button variant="contained" onClick={handleExport}>
                Exportar pdf
              </Button>
              <Button variant="outlined" onClick={confirm.onTrue}>
                SIISO IA
              </Button>
            </Grid> */}
            <Grid item xs={12}>
              {file ? (
                <iframe
                  src={file}
                  title="Vista previa"
                  width="100%"
                  height="600px"
                  style={{ border: "none" }}
                />
              ) : (
                <Typography>Cargando PDF...</Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
