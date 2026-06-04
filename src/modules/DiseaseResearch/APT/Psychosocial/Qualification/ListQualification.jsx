import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chip from 'ui-component/extended/Chip';
import {
  Box,
  Button,
  CardContent,
  Checkbox,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  ListItemText,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import swal from "sweetalert";
import toast from "react-hot-toast";
import MainCard from "ui-component/cards/MainCard";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PrintIcon from '@mui/icons-material/Print';
import SearchIcon from "@mui/icons-material/Search";
import Cargando from "components/loading/Cargando";
import EmptyState from "components/loading/EmptyState";
import ValidateAction from "components/ValidateAction/ValidateAction";
import { ParamDelete } from "components/alert/AlertAll";
import { AccionMenu, Modulo, TitleButton } from "components/helpers/Enums";
import axios from 'axios';
import FullScreenModal from 'components/controllers/FullScreenModal';
import { useBoolean } from 'hooks/use-boolean';
import { Url } from 'api/instances/AuthRoute';

import {
  GetAllAPTCalificacion,
  DeleteAPTCalificacion,
} from "api/clients/APTRatingClient";
import AnimateButton from "ui-component/extended/AnimateButton";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

const getComparator = (order, orderBy) =>
  order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "documento",
    label: "Documento",
    align: "left",
  },
  {
    id: "nombreEmpleado",
    label: "Empleado",
    align: "left",
  },
  {
    id: "cargo",
    label: "Cargo",
    align: "left",
  },
  {
    id: "listDx",
    label: "Diagnósticos",
    align: "left",
  },
  {
    id: "nombreEvaluador",
    label: "Evaluador",
    align: "left",
  },
  {
    id: 'fechaRegistro',
    label: 'Bitácora',
    align: 'left'
  }
];

function EnhancedTableHead({
  onClick,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  theme,
  selected,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ pl: 3 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>

        {numSelected > 0 && (
          <TableCell padding="none" colSpan={6}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              onClick={onClick}
            />
          </TableCell>
        )}

        {numSelected <= 0 &&
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}

                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}

        {numSelected <= 0 && (
          <TableCell align="center">
            <Typography variant="subtitle1">Acción</Typography>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  theme: PropTypes.object,
  selected: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = ({ numSelected, onClick }) => (
  <Toolbar
    sx={{
      p: 0,
      pl: 1,
      pr: 1,
      ...(numSelected > 0 && {
        color: (theme) => theme.palette.secondary.main,
      }),
    }}
  >
    <Typography color="inherit" variant="h4">
      {numSelected} Seleccionadas
    </Typography>

    <Box sx={{ flexGrow: 1 }} />

    {numSelected > 0 && (
      <ValidateAction
        idAccion={AccionMenu.eliminar}
        idModulo={Modulo.APTCalificacion}
      >
        <Tooltip title={TitleButton.Eliminar} onClick={onClick}>
          <IconButton size="large">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </ValidateAction>
    )}
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

const ListAPTCalificacion = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [lsModelData, setLsModelData] = useState([]);
  const [reportUrl, setReportUrl] = useState('');
  const openReport = useBoolean(false);
  const loadingReport = useBoolean(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRow, setMenuRow] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setMenuRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuRow(null);
  };

  async function handleReport(id) {
    if (!id) return;
    loadingReport.onTrue();
    openReport.onTrue();

    try {
      const response = await axios.get(`${Url.Base}${Url.APTCalificacion}/report/${id}`, {
        responseType: 'blob',
        headers: {
          'Accept': 'application/pdf'
        }
      });

      if (response.data.type !== 'application/pdf') {
        throw new Error('El archivo recibido no es un PDF válido.');
      }

      const url = URL.createObjectURL(response.data);
      setReportUrl(url);
    } catch (err) {
      if (err.response?.data instanceof Blob && err.response.data.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = () => {
          const errorData = JSON.parse(reader.result);
          toast.error(errorData.message || 'Error al generar el reporte');
          openReport.onFalse();
        };

        reader.readAsText(err.response.data);
      } else {
        toast.error(err.message || 'No se pudo cargar el reporte.');
        openReport.onFalse();
      }
    } finally {
      setTimeout(() => {
        loadingReport.onFalse();
      }, 500);
    }
  }

  useEffect(() => {
    return () => {
      if (reportUrl) URL.revokeObjectURL(reportUrl);
    };
  }, [reportUrl]);
  const [rows, setRows] = useState([]);
  const [idCheck, setIdCheck] = useState("");
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("fechaRegistro");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  async function getAll() {
    try {
      setLoading(true);

      const lsServer = await GetAllAPTCalificacion();
      if (lsServer.data.exito) {
        setLsModelData(lsServer.data.datos);
        setRows(lsServer.data.datos);
      } else {
        toast.error(lsServer.data.mensaje);
      }
    } catch (error) {
      toast.error("Error al consultar la información");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  const handleSearch = (event) => {
    const newString = event?.target?.value || "";

    setSearch(newString);

    if (newString) {
      const searchText = newString.toLowerCase();

      const newRows = rows.filter((row) => {
        return (
          row?.documento?.toString().toLowerCase().includes(searchText) ||
          row?.nombreEmpleado?.toLowerCase().includes(searchText) ||
          row?.nombreEvaluador?.toLowerCase().includes(searchText) ||
          row?.cargo?.toLowerCase().includes(searchText)
        );
      });

      setLsModelData(newRows);
    } else {
      setLsModelData(rows);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";

    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedId = lsModelData.map((n) => n.id);

      setSelected(newSelectedId);

      return;
    }

    setSelected([]);
  };

  const handleClick = (event, id) => {
    setIdCheck(id);

    const selectedIndex = selected.indexOf(id);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  const handleDelete = async () => {
    try {
      swal(ParamDelete).then(async (willDelete) => {
        if (willDelete) {
          const result = await DeleteAPTCalificacion(idCheck);

          if (result.data.exito) {
            toast.success(result.data.mensaje);

            setSearch("");
            setSelected([]);

            getAll();
          } else {
            toast.error(result.data.mensaje);
          }
        } else {
          setSelected([]);
        }
      });
    } catch (error) {

      toast.error("Error al eliminar el registro");
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lsModelData.length) : 0;

  return (
    <MainCard
      title="Lista Análisis de factores de riesgo psicosocial a nivel intra y extralaboral"
      content={false}
    >
      {openReport.value &&
        <FullScreenModal onClose={openReport.onFalse} loading={loadingReport.value}>
          <iframe
            src={`${reportUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            className="pdf-report-frame"
            title="Visualizador de Reporte"
            loading="lazy"
          />
        </FullScreenModal>
      }

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ValidateAction idAccion={AccionMenu.actualizar} idModulo={Modulo.APTCalificacion}>
          <MenuItem onClick={() => { navigate(`/apt-qualification/update/${menuRow?.id}`); handleCloseMenu(); }}>
            <EditTwoToneIcon sx={{ mr: 1, fontSize: '1.2rem' }} /> Actualizar
          </MenuItem>
        </ValidateAction>

        <MenuItem onClick={() => { handleReport(menuRow?.id); handleCloseMenu(); }}>
          <PrintIcon sx={{ mr: 1, fontSize: '1.2rem' }} /> Imprimir
        </MenuItem>
      </Menu>

      <CardContent>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              placeholder="Buscar"
              value={search}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3} sx={{ textAlign: "right" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ValidateAction
                  idAccion={AccionMenu.agregar}
                  idModulo={Modulo.APTCalificacion}
                >
                  <AnimateButton>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<AddCircleOutlineOutlinedIcon />}
                      onClick={() => navigate("/apt-qualification/add")}
                    >
                      {TitleButton.Agregar}
                    </Button>
                  </AnimateButton>
                </ValidateAction>
              </Grid>

              <Grid item xs={6}>
                <AnimateButton>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/apt-psychosocial/view")}
                  >
                    {TitleButton.Cancelar}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <TableContainer>
        {loading ? (
          <Cargando size={140} />
        ) : lsModelData.length === 0 ? (
          <EmptyState />
        ) : (
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={lsModelData.length}
              theme={theme}
              selected={selected}
              onClick={handleDelete}
            />

            <TableBody>
              {stableSort(lsModelData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  if (typeof row === "string") return null;

                  const isItemSelected = isSelected(row.id);

                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell
                        padding="checkbox"
                        sx={{
                          pl: 3,
                        }}
                        onClick={(event) => handleClick(event, row.id)}
                      >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>

                      <TableCell onClick={(event) => handleClick(event, row.id)} sx={{ cursor: 'pointer' }}>
                        <Typography variant="subtitle1">
                          {row.documento}
                        </Typography>
                      </TableCell>

                      <TableCell onClick={(event) => handleClick(event, row.id)} sx={{ cursor: 'pointer' }}>
                        <Typography variant="subtitle1">
                          {row.nombreEmpleado}
                        </Typography>
                      </TableCell>

                      <TableCell onClick={(event) => handleClick(event, row.id)} sx={{ cursor: 'pointer' }}>
                        <Typography variant="subtitle1">
                          {row.cargo}
                        </Typography>
                      </TableCell>

                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        onClick={(event) => handleClick(event, row.id)}
                        sx={{ cursor: 'pointer' }}
                      >
                        {row?.listDx?.length > 0 ? (
                          <Tooltip disableInteractive placement="top" TransitionComponent={Fade} title={
                            <div>
                              {row?.listDx?.map((item, index) => (
                                <div key={index}>{item.value} - {item.label}</div>
                              ))}
                            </div>
                          }>
                            <Typography
                              variant="subtitle1"
                              sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                            >
                              <Chip label={`${row?.listDx?.length} Diagnóstico(s)`} size="small" chipcolor="success" />
                            </Typography>
                          </Tooltip>
                        ) : (
                          <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                          >
                            SIN REGISTRO
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell onClick={(event) => handleClick(event, row.id)} sx={{ cursor: 'pointer' }}>
                        <Typography variant="subtitle1">
                          {row.nombreEvaluador}
                        </Typography>
                      </TableCell>

                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        onClick={(event) => handleClick(event, row.id)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <ListItemText
                          primary={row?.usuarioRegistro?.toUpperCase()}
                          secondary={new Date(row?.fechaRegistro).toLocaleString()}
                          primaryTypographyProps={{ typography: 'caption' }}
                          secondaryTypographyProps={{
                            mt: 0.5,
                            component: 'span',
                            typography: 'caption',
                          }}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <IconButton size="large" onClick={(event) => handleOpenMenu(event, row)}>
                          <MoreVertIcon sx={{ fontSize: '1.3rem' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <TablePagination
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from} - ${to} de ${count !== -1 ? count : `más de ${lsModelData.length}`
          }`
        }
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={lsModelData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
};

export default ListAPTCalificacion;
