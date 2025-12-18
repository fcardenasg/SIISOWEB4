import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Tooltip, IconButton, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/styles";
import AnimateButton from "ui-component/extended/AnimateButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Message } from "components/helpers/Enums";
import { UpperFirstChar } from "components/helpers/Format";

const ControlModalView = ({
  open,
  onClose,
  handleExportar,
  maxWidth,
  title,
  children,
}) => {
  const theme = useTheme();



  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={maxWidth}
        open={open}
        keepMounted
      >
        <Grid container>
          <Grid item xs={10}>
            <DialogTitle>
              <Typography variant="title">{title}</Typography>
            </DialogTitle>
          </Grid>

          <Grid
            item
            xs={2}
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
          >
            <DialogActions>
              <AnimateButton>
                <Tooltip title="Exportar">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleExportar}
                    size="small"
                  >
                    Exportar pdf
                  </Button>
                </Tooltip>
              </AnimateButton>
            </DialogActions>
            <DialogActions>
              <AnimateButton>
                <Tooltip title="Cerrar" onClick={onClose}>
                  <IconButton>
                    <CloseIcon
                      sx={{ fontSize: "2rem", color: theme.palette.error.main }}
                    />
                  </IconButton>
                </Tooltip>
              </AnimateButton>
            </DialogActions>
          </Grid>
        </Grid>

        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default ControlModalView;

ControlModalView.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  maxWidth: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
};
