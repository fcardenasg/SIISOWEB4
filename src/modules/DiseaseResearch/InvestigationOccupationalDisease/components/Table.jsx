import { Button, Checkbox, FormControlLabel, TextField, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { GetByTipoCatalogoCombo } from 'api/clients/CatalogClient';
import { GetIELAccionPreventivaCorrectiva, GetIELCalificacion, GetIELHistoriaLaboralDLTD, GetIELHistoriaLaboralOtrosEmpresas } from 'api/clients/InvestigationClient';
import { CodCatalogo } from 'components/helpers/Enums';
import { UpperFirstChar, ViewFormat } from 'components/helpers/Format';
import EmptyState from 'components/loading/EmptyState';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import SubCard from 'ui-component/cards/SubCard';
import { StyledTableCell, StyledTableRow } from './methods';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AnimateButton from 'ui-component/extended/AnimateButton';

export function TableDLTD({ documento }) {
  const [listHL, setListHL] = useState([]);
  const idIEL = useFormContext().getValues('id');

  useEffect(() => {
    async function getData() {
      try {
        if (documento) {
          const statusData = Boolean(idIEL);
          const response = await GetIELHistoriaLaboralDLTD(documento, statusData);
          if (response.data.exito) {
            const mappedData = (response.data.datos || []).map((item) => ({
              id: item.id,
              fecha: item.fecha,
              cargo: item.nameCargo,
              turno: item.nameTurno,
              rotacion: item.nameRotacion,
              anios: item.anio,
              meses: item.meses
            }));

            setListHL(mappedData);
          }
        }
      } catch (error) {
        toast.error("Error al cargar la historia laboral DLTD");
      }
    }

    getData();
  }, [documento, idIEL]);

  return (
    <SubCard content={false}>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="historia laboral table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Fecha de ingreso</StyledTableCell>
              <StyledTableCell>Cargo inicial</StyledTableCell>
              <StyledTableCell>Turno</StyledTableCell>
              <StyledTableCell>Rotación</StyledTableCell>
              <StyledTableCell>Tiempo en el cargo (años / meses)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listHL.length > 0 ? (
              listHL.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>{ViewFormat(item.fecha)}</StyledTableCell>
                  <StyledTableCell>{item.cargo}</StyledTableCell>
                  <StyledTableCell>{item.turno}</StyledTableCell>
                  <StyledTableCell>{item.rotacion}</StyledTableCell>
                  <StyledTableCell>{`${item.anios} año(s) / ${item.meses} mes(es)`}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  <EmptyState seeSubtitle={false} title="No hay registros" />
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </SubCard>
  );
}

export function TableOtherCompanies({ documento }) {
  const [listHLOE, setListHLOE] = useState([]);
  const idIEL = useFormContext().getValues('id');

  useEffect(() => {
    async function getData() {
      try {
        if (documento) {
          const statusData = Boolean(idIEL);
          const response = await GetIELHistoriaLaboralOtrosEmpresas(documento, statusData);
          if (response.data.exito) {
            const mappedData = response.data.datos.map((item) => ({
              id: item.id,
              empresa: item.empresa,
              cargo: item.cargo,
              anios: item.anio,
              meses: item.meses
            }));

            setListHLOE(mappedData);
          }
        }
      } catch (error) {
        toast.error("Error al cargar la historia laboral de otras empresas");
      }
    }

    getData();
  }, [documento, idIEL]);

  return (
    <SubCard content={false}>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="otras empresas table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Empresa</StyledTableCell>
              <StyledTableCell>Cargo</StyledTableCell>
              <StyledTableCell>Tiempo en el cargo (años / meses)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listHLOE.length > 0 ? (
              listHLOE.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>{item.empresa}</StyledTableCell>
                  <StyledTableCell>{item.cargo}</StyledTableCell>
                  <StyledTableCell>
                    {`${item.anios} año(s) / ${item.meses} mes(es)`}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={3} align="center">
                  No hay registros
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </SubCard>
  );
}

export function TableControlMethods({ listMC, handleDelete, disabledControl }) {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Control</StyledTableCell>
            <StyledTableCell>Tipo de control</StyledTableCell>
            <StyledTableCell>Observaciones uso brindado</StyledTableCell>
            <StyledTableCell>Observaciones nivel de protección</StyledTableCell>
            {!disabledControl && <StyledTableCell>Acciones</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {listMC?.length > 0 ? (
            listMC.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {UpperFirstChar(row.nameControl)}
                </StyledTableCell>
                <StyledTableCell>{UpperFirstChar(row.nameTipoControl)}</StyledTableCell>
                <StyledTableCell>{row.observacionBrindado}</StyledTableCell>
                <StyledTableCell>{row.observacionNivelProteccionBrindado}</StyledTableCell>
                {!disabledControl &&
                  <StyledTableCell>
                    <AnimateButton>
                      <Tooltip title="Eliminar" disableInteractive placement="top">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </AnimateButton>
                  </StyledTableCell>
                }
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={5} align="center">
                <EmptyState seeSubtitle={false} title="No hay registros" />
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function TableDiagnosisRating({ methods, disabledControl }) {
  const { control, setValue, getValues } = methods;
  const idIEL = getValues('id');

  const { fields, replace } = useFieldArray({
    control,
    name: "listCalificacion"
  });

  const formatDate = (date) => (date ? date.split('T')[0] : null);
  const handleFieldChange = (index, field, value) => {
    field.onChange(value);
    setValue(`listCalificacion.${index}.cambioRegistro`, true, {
      shouldDirty: true
    });
  };

  useEffect(() => {
    async function getData() {
      try {
        let response;
        const statusData = Boolean(idIEL);

        if (statusData) {
          response = await GetIELCalificacion(idIEL);
          if (response.data.exito) {
            const mappedData = response.data.datos.map((item) => ({
              calificacion: item.calificacion,
              nombreCalificacion: item.nombreCalificacion,
              entidad: item.entidad || null,
              fechaCalificacion: formatDate(item.fechaCalificacion),
              origen: item.origen || null,
              dictamen: item.dictamen || null,
              cambioRegistro: false
            }));
            replace(mappedData);
          }
        } else {
          response = await GetByTipoCatalogoCombo(CodCatalogo.IEL_CALIFICACION);
          if (response.status === 200) {
            const mappedData = response.data.map((item) => ({
              calificacion: item.value,
              nombreCalificacion: item.label,
              entidad: null,
              fechaCalificacion: null,
              origen: null,
              dictamen: null,
              cambioRegistro: false
            })).sort((a, b) => a.calificacion - b.calificacion);
            replace(mappedData);
          }
        }
      } catch (error) {
        console.error("Error cargando catálogo:", error);
      }
    }

    getData();
  }, [idIEL, replace]);

  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Calificación</StyledTableCell>
            <StyledTableCell>Entidad</StyledTableCell>
            <StyledTableCell>Fecha de calificación</StyledTableCell>
            <StyledTableCell>Origen</StyledTableCell>
            <StyledTableCell>Dictamen #</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((item, index) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell sx={{ textTransform: 'capitalize' }}>
                {item?.nombreCalificacion?.toLowerCase()}
              </StyledTableCell>

              <StyledTableCell>
                <Controller
                  name={`listCalificacion.${index}.entidad`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="standard"
                      disabled={disabledControl}
                      onChange={(e) => handleFieldChange(index, field, e.target.value)}
                    />
                  )}
                />
              </StyledTableCell>

              <StyledTableCell>
                <Controller
                  name={`listCalificacion.${index}.fechaCalificacion`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      variant="standard"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={field.value || null}
                      disabled={disabledControl}
                      onChange={(e) => handleFieldChange(index, field, e.target.value)}
                    />
                  )}
                />
              </StyledTableCell>

              <StyledTableCell>
                <Controller
                  name={`listCalificacion.${index}.origen`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      fullWidth
                      disabled={disabledControl}
                      onChange={(e) => handleFieldChange(index, field, e.target.value)}
                    />
                  )}
                />
              </StyledTableCell>

              <StyledTableCell>
                <Controller
                  name={`listCalificacion.${index}.dictamen`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="standard"
                      fullWidth
                      disabled={disabledControl}
                      onChange={(e) => handleFieldChange(index, field, e.target.value)}
                    />
                  )}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function TableCharacterizationAbsenteeism() {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Diagnósticos</StyledTableCell>
            <StyledTableCell>Fecha</StyledTableCell>
            <StyledTableCell>Fuente de la información</StyledTableCell>
            <StyledTableCell>Origen</StyledTableCell>
            <StyledTableCell>Incapacidad (días)</StyledTableCell>
            <StyledTableCell>Observaciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[].length > 0 ? (
            [].map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">{row.diagnostico}</StyledTableCell>
                <StyledTableCell>{row.fecha}</StyledTableCell>
                <StyledTableCell>{row.fuenteInformacion}</StyledTableCell>
                <StyledTableCell>{row.origen}</StyledTableCell>
                <StyledTableCell>{row.incapacidad}</StyledTableCell>
                <StyledTableCell>{row.observaciones}</StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={6} align="center">
                <EmptyState seeSubtitle={false} title="No hay registros" />
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function TablePreventiveActions({ methods, disabledControl }) {
  const { control, setValue, getValues } = methods;
  const idIEL = getValues('id');

  const { fields, replace } = useFieldArray({
    control,
    name: "listAspectosConsiderar"
  });

  const handleFieldChange = (index, field, value) => {
    field.onChange(value);
    setValue(`listAspectosConsiderar.${index}.cambioRegistro`, true, {
      shouldDirty: true
    });
  };

  useEffect(() => {
    async function getData() {
      try {
        let response;
        const statusData = Boolean(idIEL);

        if (statusData) {
          response = await GetIELAccionPreventivaCorrectiva(idIEL);
          if (response.data.exito) {
            const mappedData = response.data.datos.map((item) => ({
              id: item.id,
              nombreAspectoConsiderar: item.nombreAspectoConsiderar,
              opcion: item.opcion || false,
              observacion: item.observacion || null,
              cambioRegistro: false
            }));
            replace(mappedData);
          }
        } else {
          response = await GetByTipoCatalogoCombo(CodCatalogo.IEL_ASPCONSI);
          if (response.status === 200) {
            const initialRows = response.data.map((item) => ({
              aspectoConsiderar: item.value,
              nombreAspectoConsiderar: item.label,
              opcion: false,
              observacion: null,
              cambioRegistro: false
            })).sort((a, b) => a.aspectoConsiderar - b.aspectoConsiderar);
            replace(initialRows);
          }
        }
      } catch (error) {
        toast.error("Error al obtener los aspectos a considerar");
      }
    }

    getData();
  }, [idIEL, replace]);

  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 700 }} aria-label="preventive actions table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ width: '30%' }}>Aspectos para considerar</StyledTableCell>
            <StyledTableCell sx={{ width: '15%', align: 'left' }}>Si / No</StyledTableCell>
            <StyledTableCell sx={{ width: '55%' }}>Observaciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((item, index) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row" sx={{ py: 1 }}>
                {UpperFirstChar(item.nombreAspectoConsiderar)}
              </StyledTableCell>

              <StyledTableCell sx={{ py: 1, align: "left" }}>
                <Controller
                  name={`listAspectosConsiderar.${index}.opcion`}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      sx={{ m: 0 }}
                      control={
                        <Checkbox
                          {...field}
                          size="small"
                          checked={!!field.value}
                          disabled={disabledControl}
                          onChange={(e) =>
                            handleFieldChange(index, field, e.target.checked)
                          }
                        />
                      }
                      label={field.value ? 'Si' : 'No'}
                    />
                  )}
                />
              </StyledTableCell>

              <StyledTableCell sx={{ py: 1 }}>
                <Controller
                  name={`listAspectosConsiderar.${index}.observacion`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      value={field.value || null}
                      variant="standard"
                      fullWidth
                      multiline
                      size="small"
                      minRows={1}
                      maxRows={4}
                      onChange={(e) =>
                        handleFieldChange(index, field, e.target.value)
                      }
                      disabled={disabledControl}
                    />
                  )}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}