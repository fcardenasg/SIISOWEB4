import {
  Avatar,
  Box,
  Button,
  CardContent,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
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
import {
  DeleteEmployee,
  GetAllEmployee,
  GetByIdEmployee,
} from "api/clients/EmployeeClient";
import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { visuallyHidden } from "@mui/utils";
import {
  AccionMenu,
  Message,
  Modulo,
  TitleButton,
} from "components/helpers/Enums";
import MainCard from "ui-component/cards/MainCard";
// import BodyEmployee from './ViewEmployee';

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import PrintIcon from "@mui/icons-material/PrintTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { IconFileExport } from "@tabler/icons";

import { GetByMail } from "api/clients/UserClient";
import { MessageDelete, ParamDelete } from "components/alert/AlertAll";
import ViewPDF from "components/components/ViewPDF";
import ControlModal from "components/controllers/ControlModal";
import Cargando from "components/loading/Cargando";
import useAuth from "hooks/useAuth";
import swal from "sweetalert";
import { ColorDrummondltd } from "themes/colors";
// import { generateReportEmployee } from './ReportEmployee';

import config from "config";
// import GenerateExcel from './GenerateExcel';
import ValidateAction from "components/ValidateAction/ValidateAction";
import {
  DeleteHistoricalBurdenDiseases,
  GetAllHistoricalBurdenDiseases,
} from "../../../api/clients/HistoricalBurdenDiseases";
import InfoCardMui from "./InfoCardMui";
import InvestigationView from "./InvestigationView";

function getModalStyle() {
  const top = 50;

  return {
    top: `${top}%`,
    margin: "auto",
  };
}

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
    id: "id",
    numeric: false,
    label: "",
    align: "left",
  },
  {
    id: "identificacion",
    numeric: false,
    label: "Identificacion",
    align: "left",
  },
  {
    id: "primerNombre",
    numeric: false,
    label: "Nombres",
    align: "left",
  },
  {
    id: "fechaInvestigacion",
    numeric: false,
    label: "Fecha Investigación",
    align: "left",
  },
  {
    id: "generoIncapacidad",
    numeric: false,
    label: "Genero Incapacidad",
    align: "left",
  },
  {
    id: "diasIncapacidad",
    numeric: false,
    label: "Diás Incapacidad",
    align: "left",
  },
  {
    id: "cargoInicial",
    numeric: false,
    label: "Cargo Inicial",
    align: "left",
  },
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
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {numSelected > 0 && (
          <TableCell padding="none" colSpan={8}>
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
              padding={headCell.disablePadding ? "none" : "normal"}
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
          <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.mode === "dark" ? "grey.600" : "grey.900",
              }}
            >
              Acción
            </Typography>
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
    {numSelected > 0 && (
      <Typography color="inherit" variant="h4">
        {numSelected} {TitleButton.Seleccionadas}
      </Typography>
    )}

    {numSelected > 0 && (
      <ValidateAction idAccion={AccionMenu.eliminar} idModulo={Modulo.Empleado}>
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

const ListHistoricalBurdenDiseases = () => {
  const { user } = useAuth();
  const [employee, setEmployee] = useState([]);
  const [investigation, setInvestigation] = useState([]);

  const [idCheck, setIdCheck] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nombres");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [data, setData] = useState();

  const [dataPDF, setDataPDF] = useState(null);
  const [openReport, setOpenReport] = useState(false);

  async function getAll() {
    try {
      const lsServer = await GetAllHistoricalBurdenDiseases();
      console.log("GetAll", lsServer.data);
      if (lsServer.data.exito) {
        setInvestigation(lsServer.data.datos);
        setRows(lsServer.data.datos);
      }
    } catch (error) { }
  }

  const handleClickReport = async () => {
    // try {
    //     setOpenReport(true);
    //     const lsDataReport = await GetByIdEmployee(idCheck);
    //     const lsDataUser = await GetByMail(user?.nameuser);
    //     const dataPDFTwo = generateReportEmployee(lsDataReport?.data.data, lsDataUser.data);
    //     setDataPDF(dataPDFTwo);
    // } catch (err) { }
  };

  const [modalStyle] = useState(getModalStyle);
  const handleOpen = (id) => {
    console.log("idCheck", id);
    console.log("investigation", investigation);
    const filter = investigation.find((item) => item.id === id);
    setData(filter);
    console.log("filter", filter);
  };

  useEffect(() => {
    if (data) {
      setOpen(true);
    }
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    setSelected([]);
    setIdCheck("");
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleSearch = (event) => {
    const newString = event?.target.value;
    setSearch(newString || "");

    if (newString) {
      const newRows = rows.filter((row) => {
        let matches = true;

        const properties = [
          "identificacion",
          "primerNombre",
          "fechaInvestigacion",
          "generoIncapacidad",
          "diasIncapacidad",
          "cargoInicial",
        ];
        let containsQuery = false;

        properties.forEach((property) => {
          if (
            row[property]
              ?.toString()
              .toLowerCase()
              .includes(newString.toString().toLowerCase())
          ) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
        return matches;
      });
      setInvestigation(newRows);
    } else {
      setInvestigation(rows);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedId = employee.map((n) => n.documento);
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
    if (event?.target.value) setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  const handleDelete = async () => {
    try {
      swal(ParamDelete).then(async (willDelete) => {
        if (willDelete) {
          const result = await DeleteHistoricalBurdenDiseases(idCheck);

          if (result.status === 200) {
            setOpenDelete(true);
            setSelected([]);
            setIdCheck(0);
            getAll();
          }
        } else setSelected([]);
      });
    } catch (error) { }
  };

  const navigate = useNavigate();

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employee.length) : 0;

  return (
    <MainCard title="Lista de investigaciones" content={false}>
      <MessageDelete open={openDelete} onClose={() => setOpenDelete(false)} />
      {/* <GenerateExcel setOpenModal={setOpenModal} openModal={openModal} /> */}

      <ControlModal
        title={Message.VistaReporte}
        open={openReport}
        onClose={() => setOpenReport(false)}
        maxWidth="xl"
      >
        <ViewPDF dataPDF={dataPDF} />
      </ControlModal>

      <CardContent>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
              placeholder="Buscar"
              value={search}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3.5} sx={{ textAlign: "right" }}>
            <Grid container spacing={2}>
              {/* <Grid item xs>
                                <Tooltip title="Exportar" onClick={() => setOpenModal(true)}>
                                    <IconButton size="large">
                                        <IconFileExport />
                                    </IconButton>
                                </Tooltip>
                            </Grid> */}

              {/* <Grid item xs>
                                <Tooltip disabled={idCheck === '' ? true : false} title="Impresión" onClick={handleClickReport}>
                                    <IconButton size="large">
                                        <PrintIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid> */}

              <ValidateAction
                idAccion={AccionMenu.agregar}
                idModulo={Modulo.Empleado}
              >
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={() => navigate("/HistoricalBurdenDiseases")}
                  >
                    {TitleButton.Agregar}
                  </Button>
                </Grid>
              </ValidateAction>

              <Grid item xs={6}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate("/disease-research/view")}
                >
                  {TitleButton.Cancelar}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <TableContainer>
        {investigation.length === 0 ? (
          <Cargando size={220} myy={6} />
        ) : (
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={investigation.length}
              theme={theme}
              selected={selected}
              onClick={handleDelete}
            />
            <TableBody>
              <Fragment>
                {stableSort(investigation, getComparator(order, orderBy))
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
                          sx={{ pl: 3 }}
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

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          onClick={(event) => handleClick(event, row?.id)}
                          sx={{ cursor: "pointer" }}
                          align="center"
                        >
                          <Avatar
                            sx={{ bgcolor: ColorDrummondltd.RedDrummond }}
                          >
                            <Typography sx={{ color: "white" }}>
                              {row?.primerNombre[0].toUpperCase()}
                            </Typography>
                          </Avatar>
                        </TableCell>

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          onClick={(event) => handleClick(event, row.id)}
                          sx={{ cursor: "pointer" }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "grey.600"
                                  : "grey.900",
                            }}
                          >
                            {row.identificacion}
                          </Typography>
                        </TableCell>

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          onClick={(event) => handleClick(event, row.id)}
                          sx={{ cursor: "pointer" }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "grey.600"
                                  : "grey.900",
                            }}
                          >
                            {row?.primerNombre.toUpperCase() + " " + row?.segundoNombre.toUpperCase()}
                          </Typography>
                        </TableCell>

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          onClick={(event) => handleClick(event, row?.id)}
                          sx={{ cursor: "pointer" }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "grey.600"
                                  : "grey.900",
                            }}
                          >
                            {row?.fechaInvestigacion}
                          </Typography>
                        </TableCell>

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          onClick={(event) => handleClick(event, row.id)}
                          sx={{ cursor: "pointer" }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "grey.600"
                                  : "grey.900",
                            }}
                          >
                            {row.generoIncapacidad.toUpperCase()}
                          </Typography>
                        </TableCell>

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          onClick={(event) => handleClick(event, row.id)}
                          sx={{ cursor: "pointer" }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "grey.600"
                                  : "grey.900",
                            }}
                          >
                            {row?.diasIncapacidad}
                          </Typography>
                        </TableCell>

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          onClick={(event) => handleClick(event, row.id)}
                          sx={{ cursor: "pointer" }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "grey.600"
                                  : "grey.900",
                            }}
                          >
                            {row?.cargoInicial.toUpperCase()}
                          </Typography>
                        </TableCell>

                        <TableCell align="center" sx={{ pr: 3 }}>
                          <Tooltip title="Detalles" onClick={() => handleOpen(row.id)}>
                            <IconButton
                              //   disabled={idCheck == "" ? true : false}
                              color="primary"
                              size="large"
                            >
                              <VisibilityTwoToneIcon
                                sx={{ fontSize: "1.3rem" }}
                              />
                            </IconButton>
                          </Tooltip>

                          <ValidateAction
                            idAccion={AccionMenu.actualizar}
                            idModulo={Modulo.Empleado}
                          >
                            <Tooltip
                              title="Actualizar"
                              onClick={() =>
                                navigate(
                                  `/UpdateHistoricalBurdenDiseases?id=${row.id}`
                                )
                              }
                            >
                              <IconButton size="large">
                                <EditTwoToneIcon sx={{ fontSize: "1.3rem" }} />
                              </IconButton>
                            </Tooltip>
                          </ValidateAction>
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
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </Fragment>
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={investigation.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ControlModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        children={<InfoCardMui data={data} />}
        maxWidth="lg"
      />
    </MainCard>
  );
};

export default ListHistoricalBurdenDiseases;
